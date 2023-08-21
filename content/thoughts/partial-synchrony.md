GST stands for Global Stabilization time that is a finite time found in partial synchronous models. System behaves asynchronously till GST and synchronously after GST. Note that the adversary can delay GST for a finite amount of time and no protocol can explicitly detect that GST event has occured.

Design protocols for system that are usually synchronous in normal settings, but the protocol is designed to behave asynchronously. This guarantees safety and only after a finite amount of time (GST) when the synchrony assumptions are violated, does liveness and termination guarantees are provided.

# Resources

- [Synchrony, Asynchrony and Partial synchrony](https://decentralizedthoughts.github.io/2019-06-01-2019-5-31-models/)
