window.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrambleTextPlugin);

  let skewSetter = gsap.quickTo(".images-column img", "skewY"),
    clamp = gsap.utils.clamp(-50, 50);

ScrollSmoother.create({
  wrapper: "#wrap",     // 실제 html에 있는 스크롤 감싸는 부모 div 아이디
  content: "#content",  // 실제 스크롤 되는 콘텐츠가 들어있는 div 아이디
  smooth: 2,
  speed: 3,
  effects: true,
  onUpdate: self => skewSetter(clamp(self.getVelocity() / -50)),
  onStop: () => skewSetter(0)
});

  function startScramble() {
    const st = new SplitType('.scramble', {
      types: 'chars',
      charClass: 'char'
    });

    const totalChars = st.chars.length;

    st.chars.forEach((char, i) => {
      char.dataset.orig = char.textContent;

      const startDelay = 0;
      const revealDelay = 0.2 + (i / totalChars) * 1.5;

      gsap.to(char, {
        delay: startDelay,
        duration: 3.5,
        scrambleText: {
          text: char.dataset.orig,
          chars: 'upperAndLowerCase',
          revealDelay: revealDelay,
        },
        ease: 'power2.out'
      });
    });
  }

  startScramble();

});
