class ScrollEvent<T extends HTMLElement> {
  targets: NodeListOf<T>;
  observer: IntersectionObserver;
  options?: IntersectionObserverInit;
  constructor(selector: string, options?: IntersectionObserverInit) {
    this.targets = document.querySelectorAll<T>(selector);
    this.options = options ?? {};
    this.observer = new IntersectionObserver(this.cb.bind(this), this.options)
  }

  init = () => {
    this.targets.length > 0 && this.targets.forEach((target, index) => {
      target.dataset.index = String(index);
      this.observer.observe(target);
    });
  }

  cb = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number((entry.target as T).dataset.index);
        console.log(index);
        console.log(this.targets[index - 1]);
      }
    })
  }
}

export default ScrollEvent;