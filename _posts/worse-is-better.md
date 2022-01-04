---
title: 'Decentralized Caching Infrastructure: Worse is Better'
coverImage: '/assets/blog/orb.jpeg'
excerpt: 'Why Decentralize ?'
date: '2021-12-17T16:44:39.844Z'
author:
  name: A. Camuto
  picture: '/assets/blog/alex.png'
---
The backbone of modern web infrastructure is built around the client-server model. The "client-server" characteristic describes  two distinct actors on the web. Servers provide a function or service to one or many clients, which initiate requests for such services. Clients and servers are two differentiated actors on the web where typically the infrastructure underpinning “servers“ is provided by a single business. For instance, companies deploying a web application pay a single hosting company to run this web application on the servers. This model makes a lot of sense. It gives developers a lot of control over the performance, deployment, and ultimately the logs of a server; characteristics which are very helpful when first building an application. Centralized systems are natural solutions because they are easy to architect and deploy. 

In a peer to peer (p2p) infrastructure model clients and servers on a network are interchangeable. Each node can request for services and provide services. A byproduct of this is that infrastructure on p2p networks can be managed in a decentralized fashion, where many entities can run nodes on the network and workloads and tasks can be shared among many peers. But many of the simple operations that were taken for granted in a centralized architecture are now much more complex and inefficient. Consider for instance a p2p file-sharing network. When a peer wants to find a desired piece of data in the network, the search query must be flooded through the network to find as many peers as possible that share the data as there’s no single “server“ to query for the resource. Given this added complexity a natural question arises: why bother building decentralized internet infrastructure? 

## Why Decentralize ? 

What about decentralization confers any benefits ?

**Privacy ?** No.

There’s [nothing inherently private](https://www.technologyreview.com/2021/10/28/1027250/cryptocurrency-isnt-private-but-with-know-how-it-could-be/) about a decentralized ledger like Bitcoin or a peer to peer file-sharing system like BitTorrent. They can offer pseudo-anonymity at best (there’s nothing tying your name to a Bitcoin or Ethereum address for instance) but with enough persistence operations on the network can be de-anonymized. Privacy can be added on-top of a decentralized system but there’s nothing about decentralized architectures that _inherently_ gives full privacy to their users. 

**Individual Censorship Resistance ?** No.

An argument [often floated](https://www.coindesk.com/markets/2021/07/22/bitcoins-censorship-resistance-was-a-step-change-in-history/) is that because taking down a decentralized system requires taking down all nodes that operate within it, these systems grant censorship resistance to **individuals**. Within a closed system, with no external influences, this is definitely true. But decentralized systems don’t operate in a vacuum. Censorship and the legislation that surrounds it doesn’t have to completely remove access to a system, it just has to make the stakes of participating in a system much much higher. If running a Bitcoin miner puts you at a 10% risk of going to jail, those stakes will be a significant deterrent for many people to participate. Bitcoin may live on but the number of people that are willing to participate is suddenly much lower. To compound this, decentralized systems are (and have to be) built on top of existing internet pipelines, which are inherently censorable (the best example of this is the Great Firewall of China). 

**Resilience ? Yes**

Where decentralized systems can really outshine centralized systems is in terms of resilience and longevity. Consider the case of censorship once more, where decentralized systems _in aggregate_ are resilient. Removing Bitcoin in its entirety would require legislation banning its use in practically every country, and even then more risk-prone individuals could keep running nodes.  What decentralized systems offer first and foremost, when they have a sufficiently large community, is a resilience to the failures of the individual actors that constitute the system. As long as a handful of nodes survive, the system lives on.  [DigiCash](https://www.wired.com/1994/12/emoney/) and other “digital currency” startups pre-Bitcoin may have had many clever features,  may have been far more efficient, **but they are not around today**. They didn’t have thriving communities, and they effectively had to win in the very compressed time-frame determined by their funding. Decentralized systems can effectively out-wait centralized competition (which by the [Lindy Effect](https://medium.com/incerto/an-expert-called-lindy-fdb30f146eaf) increases their life expectancy) . As [Gwern Branwen](https://www.gwern.net/index) puts it: 

> _[…] in an example of ‘Worse is Better’, the ugly inefficient prototype of Bitcoin successfully created a secure decentralized digital currency, which can wait indefinitely for success, and this was enough to eventually lead to adoption, improvement, and growth into a secure global digital currency._

If you believe that baking in long-term resilience into the infrastructure that underpins the Internet is a **net good**. Then at the very least you should view decentralized infrastructure systems and protocols as candidates for getting us there. Key to securing the longevity of decentralized systems is attaining widespread usage and adoption, i.e “forming a community“. This is where the “Worse is Better“ paradigm comes into play.

## Worse is Better

Richard P. Gabriel, one of the core thinkers behind Lisp, offers a simple summary of the "Worse is Better" design principle: 

> _It is better to get half of the right thing available so that it spreads like a virus. Once people are hooked on it, take the time to improve it to 90% of the right thing._

Core to “Worse is Better“ is that the completeness of a system, in terms of capabilities and features, should always be sacrificed whenever the simplicity of an implementation is compromised ([Worse is Better original essay](https://en.wikipedia.org/wiki/Worse_is_Better)). This is conceptually similar to Christopher Alexander’s principle of “piecemeal growth” in architecture. Always begin with a minimal creation that can then grow. Create something so basic and simple that its usage becomes brainless and it can spread like wildfire. 

Take the case of the original Unix, which had countless missing features relative to other systems like Lisp Machine OSs. Here’s an excerpt from “The UNIX-HATERS handbook“ published in 1994:  

> _Even though manufacturers spend millions developing “easy-to-use” graphical user interfaces, few versions of Unix allow you to do anything but  trivial  system  administration  without  having  to  resort  to the 1970s-style teletype interface._

Unix’s simplicity meant it could be run on smaller and slower devices, whereas other OSs demanded increasingly powerful machines. From this it spread, networked, and infected the developer community— and the rest did not. And now as Unix survives, it can evolve to become what it “should” have been in the first place. Another canonical example is C++, which despite the existence of more elegant and capable object-oriented programming languages, captured the hearts of *C* users by its simplicity and outlasted them all (see [here](https://dreamsongs.com/Files/IsWorseReallyBetter.pdf) for a discussion on this). 

In a decentralized setting getting something that **just works**, and doesn’t compromise on simplicity for the sake of added features, is key to building a strong community that ultimately contributes to the adoption and resilience of the system. 

![Mountain of devices by Akili Lamour](/assets/blog/mountain_devices.JPG)
Illustration by [Akili Lamour](https://www.behance.net/akili_lamour).

## Decentralized Caching 

Internalizing these principles, simplicity is the name of the game for Myel. 

In the decentralized content delivery setting (dCDN) individual peers on the network act as caches for content, delivering data to other peers that are requesting data. In most existing dCDN setups, called _collaborative cache setups_, dCDNs retain an economic structure that is akin to that of a centralized content delivery network (CDN) [1-4]. Content publishers (like developers building a movie streaming service) pay individuals that provide caching services to store their content. Content clients (like people watching movies) are then able to retrieve the content they need from these caches, effectively creating a base economic unit composed of the publisher-cache-client triad. This in many ways imitates the setup of a centralized CDN where content creators and providers pay CDN companies like Akamai and Cloudflare to cache their content in large data-centers, which is then delivered on to content clients. 

Though it may seem natural to mimic existing centralized CDN architectures when building a decentralized CDN, this creator-cache-client triad introduces a host of vulnerabilities because we are operating in a *trustless environment* with no terms of service. Every actor in the economic triad has a potential vector of attack against another actor; creating 6 attack vectors we now need to mitigate ! As an example, content clients and caches can collude to receive payment even when content has not been transmitted [1,2,5]. Not only do existing solutions to these attacks not offer strict guarantees, they add enormous amounts of complexity to the system. A ton of coordination is required between the three actors to prevent attacks,  which is the bane of performance in distributed systems.  Systems that minimize coordination are much better at scaling from small to large workloads and adding more resources to a coordination-avoidant system will **directly increase throughput and performance** [6-13].

At Myel, our _“most awful, ridiculous, essential idea”_ (see Pauls Ford’s [quote on Bitcoin](https://www.bloomberg.com/news/articles/2013-03-28/bitcoin-may-be-the-global-economys-last-safe-haven)) is to strip away the design complexity that comes from emulating centralized business structures, reducing coordination to better increase our scaling capabilities. At its core we have a simple marketplace: clients who want content and caches that can provide it. In our first implementations we collapse this economic triad into a cache-client pair: clients pay when accessing content. Content creators are not involved in renumerating caches. We only need to mitigate two attack vectors now (non-paying clients, and caches providing bad/no content), and only have to handle coordination between clients and caches (**which would have connected anyway**). We have less complex capabilities than other dCDNs, and clients are now responsible for paying for content, but this inherently increases the longevity, resilience, and usability of our network. Clients aren’t beholden to a particular company going under or failing to pay to fetch cached content. Conversely, developers can quickly scale their content delivery infrastructure by pushing content to the network and offloading costs to all their users. On top of that we’ve created simple architectures where applications can [act as clients on behalf of their users](https://www.myel.network/blog/road-to-decentralized-cdn), effectively allowing developers to pay for caching infrastructure without any of the complex attack mitigations needed in the collaborative cache setup. 

### Contribute 

Our simple design means that Myel cache providers are so lightweight that they can run on practically any device. We’ve deployed nodes on **tiny** AWS instances, Raspberry PIs, Mac Minis and our laptops. If you want to help build the backbone of resilient internet infrastructure [run a node](https://github.com/myelnet/pop). If you need help to get set up reach out to the core team on [discord](https://app.skiff.org/docs/discord.link/myel) or [open a Github issue](https://github.com/myelnet/pop/issues) with your specific problem. If you’re more technically minded and want to help contribute we have a [toy example](https://github.com/myelnet/graphsync-example) which uses some of our stack. All of [our code](https://github.com/myelnet) is open source so you can poke around. 

References

[1] Dykes, S. G., Jeffery, C. L., & Das, S., **Taxonomy and design analysis for distributed Web caching**. Proceedings of the Hawaii International Conference on System Sciences, 1999

[2] Almashaqbeh, G., **CacheCash: A Cryptocurrency-based Decentralized Content Delivery Network**, 1999

[3] Almashaqbeh, G., Kelley, K., Bishop, A., Cappos, J., **CAPnet: a defense against cache accounting attacks on content distribution networks**. IEEE Conference on Communications and Network Security (CNS), 2019

[4] Thang  X.  Vu,  Symeon  Chatzinotas,  and  Björn  E.  Ottersten.   **Blockchain-based  content delivery networks:  Content transparency meets user privacy**. CoRR, 2019

[5] Published  by  Robert  Collins.    **A  cachecash  retrospective**,  Dec  2019.  URL 

[6] Seth Gilbert and Nancy Lynch. **Brewer’s conjecture and the feasibility of consistent, available, partition-tolerant web services**. SIGACT News, 2002.

[7] Seth Gilbert and Nancy Lynch. **Perspectives on the CAP Theorem**. Computer, 2012.

[8] Daniel Abadi. **Consistency Tradeoffs in Modern Distributed Database System Design: CAP is Only Part of the Story**. Computer, 2012.

[9] Peter Bailis, Aaron Davidson, Alan Fekete, Ali Ghodsi, Joseph M. Hellerstein, and Ion Stoica. **Highly available transactions: Virtues and limitations**. Proc. VLDB Endow, 2013.

[10] Peter Bailis, Alan Fekete, Michael J. Franklin, Ali Ghodsi, Joseph M. Hellerstein, and Ion Stoica. **Coordination avoidance in database systems**. Proc. VLDB Endow., 2014

[11] Chenggang Wu, Jose M. Faleiro, Yihan Lin, and Joseph M. Hellerstein. **Anna: A KVS for any scale**. ICDE, 2018.

[12] Joseph M. Hellerstein. **The declarative imperative: Experiences and conjectures in distributed logic**. SIGMOD Rec., 2010.

[13] Peter Alvaro, Neil Conway, Joseph M. Hellerstein, and William R. Marczak. **Consistency Analysis in Bloom: a CALM and Collected Approach**. CIDR, 2011
