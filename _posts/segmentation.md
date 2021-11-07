---
title: 'Region-based Network Segmentation for Decentralized Content Routing'
coverImage: '/assets/blog/orb.jpeg'
excerpt: 'In which we segment the Myel network by subscribing caches and clients with similar latencies (i.e that are close geographically) to the same Gossipsub topics.'
date: '2021-05-24T21:01:07.322Z'
author:
  name: 'A. Camuto'
  picture: '/assets/blog/alex.png'
---

#### Abstract

Content discovery in decentralized cache systems remains an open problem. Many existing solutions use semi-centralized approaches, such as a centralized index of cache-content pairings, that negate some of the benefits of full decentralization. They introduce single points of failure and potentially compromise the privacy of clients requesting content. Here we implement a content discovery solution on the Interplanetary File System (IPFS) which is fully decentralized. 
We segment the network by subscribing caches and clients with similar latencies (i.e that are close geographically) to the same Gossipsub topics. We term this approach `region-based' segmentation and demonstrate that it outperforms other more naive content discovery methods. 

#### Introduction

Content delivery at a global scale is a difficult problem. Current state of the art  Content Delivery Networks (CDNs) have been refining and improving the client-server content delivery model for decades to build highly performant data delivery and data streaming services. Nevertheless, there remain some benefits to moving towards decentralized content delivery systems, the development of which has been an outstanding problem for several decades now **[1]**. In the decentralized setting, individual *peers on the network act as caches for content*, delivering data to other peers that are requesting data. Such systems can  offer cheaper content delivery by having many actors competing to drive prices down.  They are more resilient to business failures (e.g there is no single company managing the CDN whose bankruptcy takes the network with it). They also offer greater privacy in that they lack a single point of access for collecting user-data (i.e greater privacy); and if data is replicated across multiple caches, they are less likely to experience downtime in which content is not accessible **[1,2,3]**. 

These benefits do not come for free however. Decentralization introduces a host of new challenges and here we focus on the issue of content discovery: finding which peer(s) hold(s) the content that a client on the network is requesting. Many existing implementations have relied on the maintenance of centralized databases, which index peer-content pairings, maintained by the content publisher (i.e the person that pushed the content to the network) **[1,2,3]**. 
When a client requests the content, they first query the publisher, who searches the index and returns the address of the peer that holds the desired content. Not only does this approach negate some of the privacy benefits of a decentralized system, it also creates a single point of failure in the peer-content index. 

Here we implement a content discovery solution on the Interplanetary File System (IPFS) **[4]**, which is fully decentralized in that it does not rely on the maintenance of a peer-content index. To counter the overhead of fully decentralized discovery, we introduce an approach that segments the network by `region', whereby queries for content are only published to peers that have similar latency.
To implement this segmentation we use *Gossipsub*, a popular *pubsub* routing algorithm with good scaling properties.
We benchmark against other more naive decentralized content discovery approaches and show preliminary results that demonstrate that a region-based segmentation approach accelerates content discovery significantly. 

#### Description of system

##### Content Discovery on IPFS using Gossipsub

In our discovery system when publishers add content to the IPFS network, the content is dispatched to specific groups of cache provider nodes. This new content is advertised to the caches with a Gossipsub messaging protocol. Sub-networks of providers are grouped around Gossipsub topics and clients target relevant caches by publishing to those topics. It is then the cache providers' decision to accept the request and retrieve the content from the client to serve it for future requests.

When retrieving content from the network, clients request for a particular content ID (CID), along with IPLD selector parameters, which allow for the client to retrieve a specific file within a CID.  This query is relayed across the *pubsub mesh* associated with a specific Gossipsub topic -- this is the network of cache providers subscribed to that specific topic. These providers then check whether the CID and selector in the query match content they have cached. Cache providers without the content can ignore the query, else they send a response back to the client that indicates they have the content and contains the terms under which they a willing to transfer it. To maintain the privacy of the client querying the network for content, the provider recursively forwards its response through the chain of peers the original query message passed through. This prevents any given peer from identifying the client behind a content query and is similar to some of the mechanisms implemented by Gnutella2 **[5]**. 

##### Region-based Segmentation using Gossipsub

To optimize this system we introduce the concept of `regions'. 
Regions segment the network via Gossipsub topics defined around peer declared geographic locations. To preserve the privacy of providers we do not record the location of a device and instead let users declare the region they wish to serve. It is in the best interest of a provider to pick the region according to their location and peers subscribed to a same region topic should have similar latency, allowing for a faster propagation of Gossipsub messages. 

#### Experiments

In our setup we assume the content has already been dispatched to the network of caches, and that the client sending the query for content can find the address of at least one other live node and use it to bootstrap a routing table.
Our implementation uses libp2p's Kademelia Distributed Hash Table (DHT) **[6]** routing for peer discovery and Gossipsub algorithm (For a detailed overview of our implementation we refer the reader to [this repo](https://github.com/myelnet/pop/blob/9ec6edd7abd13004a64d73d44bc877b926c5ef0d/testplans/routing.md)) for content routing. 

Our messages are CBOR encoded to stay compact and to be compatible with Filecoin and IPLD.To test the discovery system, we ran experiments on an **Ubuntu AMD Ryzen 9 3900XT 12-Core Processor - 64GiB DDR4** using [Testground](https://github.com/testground/testground), which simulated a network of up to 40 peers. We run a range of experiments with different setups in which we measure the *Time to Discovery*. This is the combined time it takes for a client's query to reach a cache provider with the desired content, and for the provider's response to be returned to the client. 

##### Peer Groups

The simulated network contains different peer groups that replicate real world scenarios.

- The client group makes queries for content during the lifecycle of a test session.
- The provider group stores the content requested by clients and reply to client queries.
- The bystander group includes client and provider nodes that aren't actively querying for content; or storing the content clients are looking for.

A client, that is not directly connected to a provider with the desired content, can find an appropriate provider by having their query relayed through multiple bystander nodes. These bystanders simply pass on the query to other peers they are connected to; that are also subscribed to the same Gossipsub topic as the original client. We assume that most nodes in experiments are bystanders. 

##### Peer Connections

The way peers are connected in the network heavily influences the time to discovery. To simulate real world network topologies, we connect some nodes directly and connect others by letting the IPFS DHT randomly distribute connections. We set the minimum (min) and maximum (max) number of connections a peer can be connected to during experiments. 

##### Network Conditions

We assume peers have different network conditions and uniformly generate parameters between a min and max.

- *Connection latency* is randomly selected between 50ms to 300ms by default. To simulate different geographic regions we attribute a different min and max per region.
- *Bandwidth* is generated based on the average bandwidth for end users of recent and mid to high performance devices. We chose a min of 500KB and max of 10MB.
-  *Jitter* is generated based on values encountered in real world situations in which users may be using more brittle wireless connections. Our min is 30ms and max 50ms.

##### Segmentation and Benchmarks

We set our regions to contain around 10 peers per region. Peers within a given region are initialised to have similar latency.  We compare our network segmentation approach to a naive approach with no network segmentation such that the entire network constitutes a single Gossipsub topic. We also compare to an approach (content segmentation) which segments the network by topics unrelated to geographic location. In this case, peers who subscribe to a topic may be in different geographies and thus have different randomized latency. 

![](/assets/blog/discovery_res_combined.png) 
*Figure 1: Here we test the scalability of the three content discovery methods on our test networks for a number of peers $ \in [10,20,30,40]$. **[left]** We measure the time for a client to discover the content in each of these setups (milliseconds). **[right]** We measure the percent difference in content discovery time w.r.t the setup with 10 peers. For both plots shading represents the standard deviation over 24 runs. Clearly the approach that segments the network by region is most performant and scales better as more peers join.*



##### Discussion and Conclusion

The results of these experiments can be seen in Figure 1 . Clearly the Region based segmentation outperforms other methods of discovery and scales better as more peers are added. Given these results our aim now will be to further test this system with a greater number of peers.

In the meantime you can [sign up](/sign-up) to try it out or if you have any feedback you can open an issue directly on the [repo](https://github.com/myelnet/pop).

Thanks for reading!

##### REFERENCES

- **[1]**  S.  G.  Dykes,  “Cooperative  web  caching  using  server-directed  proxysharing,” 1998.
- **[2]**  G.  Almashaqbeh,  “CacheCash:  A  Cryptocurrency-based  DecentralizedContent Delivery Network,” 2019.
- **[3]** T. X. Vu, S. Chatzinotas, and B. E. Ottersten, “Blockchain-based contentdelivery networks: Content transparency meets user privacy,” CoRR, 2019.
- **[4]**  J. Benet, “IPFS - content addressed, versioned, P2P file system,” CoRR, 2014.
- **[5]**  G. Tribhuvan, “A Brief Introduction and Analysis of the Gnutella Protocol,”Group.
- **[6]**  P. Maymounkov and D. Mazieres, “Kademlia: A Peer-to-Peer InformationSystem Based on the XOR Metric,” inPeer-to-Peer Systems, 2002
   
