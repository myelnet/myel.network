---
title: 'Myel Technical Update'
coverImage: '/assets/blog/TechSketch.svg'
excerpt: 'Yesterday we presented a technical overview of our approach building Myel point of presence nodes at a Filecoin builders mini summit. Here is a recap of what we shared during the presentation.'
date: '2021-04-27T15:13:07.322Z'
author:
  name: 'T. Chardin'
  picture: '/assets/blog/tchardin.png'
---
Yesterday we presented a technical overview of our approach building Myel point of presence nodes at a Filecoin builders mini summit.
Here is a recap of what we shared during the presentation.

## Context
The goal of Myel is to be the CDN for decentralized storage networks. At the core our system is a network of points of presence (PoP) that run data exchanges (formerly known as Hop exchange) and allow any individuals to publish content and provide bandwidth and fast storage to the network against financial incentives.
We started out building an IPFS plugin to run with any IPFS node however we realized this would require some upgrades to the current IPFS implementation that may not be available until later this year. Instead of waiting, we are releasing  a standalone PoP node that remains fully compatible with IPFS but can run independently. PoP nodes provide a very simple interface to publish and retrieve content from cache providers. In the following sections, I will go over this interface and get deeper under the lower level components under the abstraction.

## API
At the highest level, the PoP exchange provides a writable cache interface. One can write content to the network of caches like this:
```go
import (
	ex "github.com/myelnet/pop/exchange"
 )
  
e := ex.New(context, libp2pHost, datastore, options)
  
// Create a new transaction, target a specific region like ex.WithRegion(ex.Europe)
tx := e.Tx(context)
// Assemble in the local DAG
err := tx.PutFile("/path/to/MyFile")
// Dispatch to the network
err = tx.Commit()
// Returns the root of the transaction DAG
cid := tx.Root()
```
Next to read content from a transaction with a given root CID we can do:
```go
// Get new content
ntx := e.Tx(context, ex.WithRoot(cid), ex.WithStrategy(ex.SelectFirst))
  
// or query the entire DAG with ntx.Query(sel.All())
err = ntx.Query(sel.Key("MyFile"))
  
// We can manually triage offers if needed
// requires passing ex.WithTriage() to the Tx constructor
selection := ntx.Triage()
fmt.Printf(selection.Price())
selection.Confirm()
// GetFile will wait for the transfer to complete
reader := ntx.GetFile("MyFile")
// read the file however you want
err = files.WriteTo(reader, "/out/MyFile")
```
Currently we only put files into transactions though we can easily add support for all sorts of IPLD data structures based on use cases. All complexity of dealing with a distributed system is asbtracted away an one needn't deal with the underlying data markets to cache arbitrary content. In addition, we will be working to enable this API as a Javascript SDK as well by the end of year.

## User Interfaces
We currently offer a couple experimental ways of managing and accessing a PoP including:
- pop CLI
![Pop command line interface](/assets/blog/pop-cli.png)
- HTTP Gateway
![Pop gateway](/assets/blog/pop-gateway.png)

## Data Structures
Behind every transaction is an IPLD dagcbor Map with Entry structs associated with a Key string for every Put operation. We can write the IPLD schema like:
```ipldsch
type Tx {String:Entry}

type Entry struct {
  Key   String
  Value Link
  TTL   Int
  Time  Int
}
```
Link can represent any DAG such as unixfs dagpb for example. This data structure isn't optimizes for putting a large amount of keys in the same transaction hence we recommend doing multiple transactions if need be. We probably will try out some Trie based data structure as we learn more about use cases.

## Regions
A PoP may serve one or more regions based on demand and geographic location. We provide bootstrap nodes for every region to discover peers in a new region rapidly. Regions are self-declared, we do not attempt to track the location of PoPs and leave it to users to decide which region makes the most sense for their use case.

## Index
A PoP node maintains an index of content it is storing at a given time. For every read it increments a counter and implements a least frequently used (LFU) eviction algorithm to keep storage below a given threshold based on device capacity and user preference. Additionally it maintains a secondary index labeled "Interest" for popular content it knows about and may decide to obtain later if the read frequency of a content reference is high enough. Those index lists are backed by IPLD hashed array mapped tries for fast access of a given key.

## Replication
The replication module runs a messaging system and sends a greetings message to every peer upon connecting sharing their serviced region(s) and the root of their supply index. As they receive those messages, PoPs query parts of each other's indexes to find out about popular content they may not be storing already. As they discover new content a worker retrieves new content every epoch if content is deemed more popular than what's already in the supply. Evicting less popular content in the process.
PoP can publish new content to adjacent nodes given a replication factor and a region. This is how new content is initially introduced in the network. If this content is requested enough it will be further replicated as the network topology evolves.

## Discovery
Also known as content routing, this module is in charge of finding providers serving given content when attempting to retrieve it. PoPs may implement different discovery mechanisms in the future but currently use a Gossip pubsub message routing algorithm akin to Gnutella's. Query messages describing the content to find are published to topics based on regions and offer messages are recursively forwarded back to the sender. This adds additional privacy as the larger the network becomes the harder it is to track the content a given peer is looking for.

## Offer selection strategies
When querying discovery systems, a PoP may receive any amount of offers describing terms providers are willing to accept for transfering the content. To select those offers we offer different types of strategies that may be more useful depending on the use case.
- `SelectFirst` may be the most performant and simply executes the first offer regardless of the terms.
- `SelectCheapest` after n offers or t delay may allow to find a cheaper deal by compromising on performance.
- `SelectFirstLowerThan` amount allows setting a price ceiling to protect from providers over charging though may not adapt to market conditions if demand is surging for the requested content and providers charge extra premium.

> We need to specify a standard for data delivery market `Offer` schema with help from the IPFS/Filecoin ecosystem

## Retrieval
Once an offer is selected, the strategy worker executes the retrieval operation. Metered transfers are based on the Filecoin transfer protocol and keeps the same state machine to be compatible with Filecoin storage miners with some key deferences including a role agnostic retrieval manager and a state machine that needn't unseal before starting a transfer.

## Payments
Payments are executed using Filecoin payment channels. A payment channel manager service sends messages to a Lotus node to execute on chain transactions and manage payment channels. PoP node automatically settle and collect payment channel without need for user actions. We currently provide access to a Lotus node and PoP users are free to connect to their own nodes or publicly available nodes.
   
