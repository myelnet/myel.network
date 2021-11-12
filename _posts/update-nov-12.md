---
title: 'Myel update: dCDN building blocks and browser client'
coverImage: '/assets/blog/arcs.jpeg'
excerpt: 'Myel development update'
date: '2021-11-12T09:46:40.488Z'
author:
  name: A. Camuto
  picture: '/assets/blog/alex.png'
---
We're really excited to share an update on the first iteration of the Myel network, which we've been working on for the past year. This is the first step in our quest to build a content delivery network that is resilient 💪, scalable 🌏, and peer-to-peer ↔️ to suit the long-term needs of Web3 applications.

### Why care about a decentralized content delivery network ? 

Content delivery networks (CDNs) bring dynamic and static web content as close as can be to end-users. They power our [code repos](https://www.fastly.com/customers/github/), our [food delivery services](https://www.fastly.com/customers/deliveroo/), and our [memes](https://www.cloudflare.com/case-studies/9gag-cdn-ddos-protection/).  They serve trillions (yes trillions) of requests every day, without breaking a sweat -- all the while protecting applications from DDoS attacks and sudden spikes in traffic. They're a core component of what makes the modern web so reliable and  easy to use. 

However, given that they are the backbone of performant content serving, when CDNs fail, they fail in very visible ways. When Fastly [went down in June](https://www.datacenterdynamics.com/en/opinions/inside-the-fastly-outage-a-firm-reminder-on-internet-redundancy/) it took down Amazon, Reddit and the NyTimes with it. 

They're also expensive to expand. Setting up new points of presence on a centralized CDN requires either capital expensive data-centers, or complex business relationships with Internet Service Providers, who integrate CDN points of presence [into their routers](https://www.akamai.com/content/dam/site/en/documents/research-paper/pushing-cdn-isp-collaboration-to-the-limit-technical-publication.pdf). 

Our aim is to create infrastructure that can survive any business failure and provides a dynamic mesh of caches that can easily and dynamically expand to serve Web3 applications which need robust and decentralised infrastructure. We want to create a single protocol from which CDNs and caches can grow, without needing large capital investments or complex business agreements. We've created an interface that makes our network inherently extensible and modular, such that new nodes can easily be deployed to grow the CDN. 

### dCDN building blocks 

This first iteration provides a set of buildings blocks that
- allow us to easily extend our CDN by spinning up a new node in an instant.
- are fully interoperable with the IPFS and Filecoin ecosystem.

At the core of this is the golang interface of the Myel `pop` nodes, the independent caches that can host and serve content to requesting clients. This interface currently allows for four operations, which are: 
- **Content dispatching**: a node can ask other peers to cache content. When dispatching content, peers select a replication factor **n**, which is the number of peers the content is sent to. 
- **Content routing**: a node can make a direct query for specific content, as determined by a unique Content ID (CID). 
  - To improve performance for this release, we maintain a list of **(cache, content)** pairs on a Cloudflare edge index, allowing for clients to quickly discover which peer is hosting which piece of content. As a backup for clients that wish to avoid centralized intermediaries, we have implemented a fully decentralized gossip-based content discovery system.  
- **Content delivery**: nodes can exchange content without trusting each other.
- **Payments**:  a node can pay another node for delivering content. Currently payments are issued via Filecoin payment channels, though our system is modular enough that other blockchains could be used. 

On their own these operations are simple, but they allow for more complex capabilities when orchestrated across a network of peers. 

### An in-browser client

Typically dCDNs and p2p file sharing networks have relied on HTTP gateways which act as middlemen to serving browser clients (see the [many](https://ipfs.github.io/public-gateway-checker/) IPFS gateways which enable browsers to connect to the IPFS network). This is because most browser and applications don't natively support the required protocols to interact with the nodes on these p2p networks directly.

As a workaround, requests for content are relayed through the gateway to peers and in return content is then ferried back through the gateway to the client. This necessarily diminishes the benefits of using a dCDN, as the gateways are not as distributed as the network of peers, and are not able to offload bandwidth load to other peers. As such, they introduce bandwidth bottleneck and single points of failure into the network.

To address this, in conjunction with the golang `pop`  interface, we've also been building a Javascript client for browsers that can connect _directly_ to cache providers, without the help of a gateway. This client replicates some of the functionality of `pop` nodes into Javascript and as such can act as a fully fledged client - requesting content and paying for it. By removing the need for these client gateways, we can keep the network decentralized and resilient to failure, without compromising on useability !  

