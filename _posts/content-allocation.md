---
title: 'Optimal Content Allocation on the Myel network'
coverImage: '/assets/blog/neurons.jpeg'
excerpt: 'With an infinite influx of content and limited amount of storage, Myel nodes must decide how to best allocate and replicate content with their peers. Here we introduce the content distribution system behind the Myel network.'
date: '2021-01-09T05:35:07.322Z'
author:
  name: A. Camuto
  picture: '/assets/blog/alex.png'
---
Our previous post covered the reasons we're building Myel. We're building a new app development paradigm where your users and your community act as your infrastructure. You can focus on building a great user experience and don't need to waste time on scaling out your infrastructure, on ensuring your servers and code are interoperable with your content delivery network (CDNs), or on micro-managing your cloud costs. 

Your users 'host' your app for you, and as more users use your app, your infrastructure scales automatically. They're your backend servers, your content delivery points of presence, and your customers all wrapped in one. 

To surpass the performance of existing centralized CDNs, the Myel network requires lots of peers to join it. The more peers there are, the more we can duplicate content across the world and serve it rapidly to your users. But, we also need to take into account new challenges that centralized CDNs do not face. 

### What Challenges ?

In a centralized model, you pay a CDN provider a fixed monthly rate and they will allocate your content to a few of their points of presence. These are typically in large cities like London or New York, from which they cache and serve your content. There are not a ton of places to choose from, and picking where to allocate content is relatively straight-forward. If your user base is mainly French, then caching content within a CDN's Paris point of presence makes the most sense. 

In the Myel world, the network points of presence are dynamic. They can turn on and off at a whim. Someone can shut their laptop for the night or their wifi can go down. 

To counter this phenomenon we have a few tricks up our sleeve. The first is that peers get paid every minute they have a Myel node running. The more content they cache for applications and other users the more Filecoin they receive. This should incentivize users to keep their laptops on for longer periods of time. 

Nevertheless we can't guarantee constant up-time for each peer. So our second mechanism is to duplicate content across points of presence; enforcing redundancy and resilience. Your content is cached across multiple users' hardrives, so that if one user goes offline, another still has that content ready to go. 

### Smart Content Allocation

But we can't blindly duplicate content across every user in the network. We need to be smart about it. If most of your users are in Japan, we should prioritize allocating your content to peers there, so that they can quickly deliver it to other users. 

Enforcing this is simple, if someone visits your website they automatically become a point of presence for your content. That way your points of presence automatically reflect the demographics of your user base, as your users __are your points of presence__ ! 

But lets say your starting a new project, and you don't have a lot of users just yet but you want CDN-like performance and maximum up-time from the get-go. 

To achieve this we'll always ensure Myel peers have some free hard-drive space to onboard new applications to the network. We distribute your content to peers that have a good 'reputation' first. These are peers that have been online consistently and have good hardware so they can deliver content quickly. 

At first we distribute your content across the globe, and with maximum redundancy, as you might not know where your future user base lies! As more and more users start requesting your content, becoming peers themselves, we start to collect statistics on who, what and where your content is going. If your users are mainly in Japan, we'll ensure redundancy beyond your user-base by allocating your content to high-reputation Myel users in Japan. This way you have a solid and reliable base-load of points of presence close to your users.  

When you push new content, we'll prioritize allocating it to this reliable baseload first, as we know it'll be close to your existing user-base. 

Because your content is allocated organically in this way, we bring content closer to your users than existing CDNs ever could. We make content delivery as fast and efficient as it ever could possibly be.   

[Sign up](https://www.myel.network/#/sign-up) to try it out or feel free to open an issue directly on the [repo](https://github.com/myelnet/go-hop-exchange) if you have any feedback.


