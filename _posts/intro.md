---
title: 'Myel: A Community Powered Content Delivery Network'
coverImage: '/assets/blog/eclipse.jpeg'
excerpt: 'Learn more about Myel, a community powered content delivery network, as I guide you through hosting a simple blog on Myel.'
date: '2021-01-07T05:35:07.322Z'
author:
  name: 'T. Chardin'
  picture: '/assets/blog/tchardin.png'
---
When I first started developing with IPFS back in 2017, I was fascinated with all the use cases it would enable but what got me most excited was the ability to build applications without ever needing a server. Sure, data ownership, censorship resistance and content addressing was neat but at the time I couldn't afford remote server costs and had to max out Heroku's free tier to serve my apps so having a protocol to serve file and content directly from users' devices was revolutionary.

It took me quite some time to wrap my head around the distributed state paradigm as opposed to the client server model I was used to. I was most surprised to find out when I would "add" data to IPFS, it wasn't actually uploaded and replicated across the network. For that to happen required other nodes to be interested in that same data, fetch it from my node and pin it to their local store. So when I added my cool app's source files to IPFS, and my laptop was off my users couldn't access it.

To solve this we had to host an IPFS node on a server and accessing content through its http gateway. To me it defied the purpose of using IPFS and so I kept serving my apps on Heroku.

Fast forward to 2021 and we have Filecoin, a blockchain protocol to pay remote peers directly to store your IPFS blocks. The Filecoin protocols offer a bunch of proofs to guarantee a peer will store and make data available during the duration of an agreed upon contract. To compute these proofs, becoming a storage provider on the Filecoin network requires powerful hardware and substantial storage capacity. Although it considerably lowers the barrier to entry for new cloud storage businesses, one cannot provide storage with their regular PCs.

In fact, Filecoin storage is an incredible solution for archiving and cold storing but what happens if a large amount of people want to access the same content around the world?
    
At the time of this writing:
- To retrieve content from Filecoin a client must know the network identity of the storage peers.
- A client can only retrieve content from storage providers part of the related storage deal.
- Filecoin storage providers need to store a duplicate copy of content  so they can serve it faster without unsealing a sector.
- One must run a Filecoin lotus node to retrieve content.

In the Filecoin whitepaper, Juan Benet et al envisioned a secondary market where some peers could temporarily store content to let other peers retrieve it faster. This sparked my original excitement for IPFS and so with my partners in crime, Alex and Sandra we decided to build the hot storage and retrieval layer for Filecoin.

Application developers are building incredible new digital experiences. These new applications such as VR games, immersive video streaming and rich content publishing platforms require flexible and powerful content delivery tools like never before. Our mission at Myel is to help developers bring and scale performant new experiences to the entire world without relying on expensive server side infrastructures.

While there are many sophisticated use cases we will enable over time, we'd like to show a simple example our first version of the Myel retrieval system can handle: this simple blog.

As we develop Myel we'd like to publish notes and insights about our progress. The content can be formatted as a bunch of markdown files, images and maybe audio and video product demos. Further, we'd like to write the blog UI once and easily publish new posts without touching the code. To do this we've built 3 components:

### The Hop Exchange

An IPFS exchange interface like Bitswap which uses a lightweight gossipsub implementation to ask other nodes in the network if they have the requested blocks. Peers that have the blocks stream a response back with retrieval deal terms they support and the exchange starts a payment channel, connects to a remote lotus RPC and sends a FIL transaction to retrieve the blocks.

On Start, the exchange subscribes to a GossipSub topic to receive cids about new content uploaded to Filecoin. If they have available space (configurable), the exchange will automatically retrieve the content from the publishing client (Without any FIL charge).

The Hop exchange wraps Bitswap so if a bitswap request yields no result it will call the hop exchange to try retrieving the content from a Filecoin retrieval provider. Further, it will soon be available as an IPFS plugin making it easy for anyone to turn their IPFS node into a retrieval provider node and earn FIL to temporarily store content.

### The Myel Desktop App

A MacOS desktop app allows developers and retrieval providers to run and manage a Myel node. The app is a native Swift app featuring a simple file browser and wallet interface and spawning a go daemon running in the background to store and serve content to the network. By default it interacts with a lotus node on Infura but one can run their own lotus node if they wish to do so.

Myel nodes run the Hop Exchange so they implement the same features with an added intuitive user interface for visual feedback of the market and retrieval earnings. On top of this, it features an onramp banking connection UI to easily add FIL to the wallet.

To upload files to Filecoin, one can create a new directory and add files to it. Once they're ready to store it, they get an estimated deal price based on the connected peers and can start a deal. This will automatically upload the content for storage on Filecoin and propagate the content to other peers for fast retrieval.

Technically one could use this app to store any files they desire on Filecoin however we aren't optimizing the app so the functionality will remain very rudimentary.

### The Myel js client

A modern lightweight javascript library allows web applications to load content from a local Myel node via http. If a Myel node is not running the library will prompt to start or install the app.

Optional react hooks can also be installed to load and cache content in modern React apps.

Getting back to our blog, since IPFS is not supported in most browsers yet we need to point our blog domain to a gateway to resolve our source code. In addition, we upload our content directory to Filecoin and propagate it across the Myel network.

When the blog source code loads in our readers' browser it checks if a local Myel node is running if it's not the case it falls back to a temporary placeholder at the developer's discretion. We still decided to leave this article on IPFS for easier access but we encourage you to try the Myel app and retrieve the content with testnet FIL.

Most of the source code can be cached in a service worker, so no more requests to the gateway will be necessary if you are running a local Myel node. As we add more articles, we publish them under an IPNS so we can easily query the latest root hash for all our content. 

### Next steps

We are still testing on the Filecoin Calibration net and will be releasing to mainnet soon. There is a large body of work involved in optimizing how to route and replicate content across the Myel network and to that end we are applying for a Filecoin grant to support our effort.

In the meantime you can [sign up](https://www.myel.network/#/sign-up) to try it out or if you have any feedback you can open an issue directly on the [repo](https://github.com/myelnet/go-hop-exchange).

Thanks for reading!
   
