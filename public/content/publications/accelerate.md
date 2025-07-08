---
title: "Accelerated Training via Device Similarity in Federated Learning"
authors: "Yuanli Wang, Joel Wolfrath, Nikhil Sreekumar, Dhruv Kumar, Abhishek Chandra"
venue: "EdgeSys 2021"
link: "https://dl.acm.org/doi/abs/10.1145/3434770.3459734"
---
Existing Federated Learning strategies for device selection are inefficient because they address system heterogeneity but largely ignore the impact of varied data distributions across devices. This paper proposes a new approach that first clusters devices with similar data and then selects the most powerful devices from each cluster for training. This method significantly speeds up model convergence and improves fault tolerance without compromising final model accuracy. Preliminary experiments demonstrate that this technique can reduce training time by 46% to 58% compared to existing approaches to reach the same level of accuracy.