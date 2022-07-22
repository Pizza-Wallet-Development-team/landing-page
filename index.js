function pop(e) {
  let amount = 10;
  // Quick check if user clicked the button using a keyboard
  if (e.clientX === 0 && e.clientY === 0) {
    const bbox = e.target.getBoundingClientRect();
    const x = bbox.left + bbox.width / 2;
    const y = bbox.top + bbox.height / 2;
    for (let i = 0; i < 30; i++) {
      // We call the function createParticle 30 times
      // We pass the coordinates of the button for x & y values
      createParticle(x, y, e.target.dataset.type);
    }
  } else {
    for (let i = 0; i < amount; i++) {
      createParticle(
        e.clientX,
        e.clientY + window.scrollY,
        e.target.dataset.type
      );
    }
  }

  if (e.target.className === 'link') {
    setTimeout(function () {
      window.open('https://twitter.com/Pizza__Wallet', '_blank');
    }, 1000);
  }
}
function createParticle(x, y, type) {
  const particle = document.createElement('particle');
  document.body.appendChild(particle);
  let width = Math.floor(Math.random() * 30 + 8);
  let height = width;
  let destinationX = (Math.random() - 0.5) * 3000;
  let destinationY = (Math.random() - 0.5) * 3000;
  let rotation = Math.random() * 520;
  // let delay = Math.random() * 200;

  switch (type) {
    case 'gesture':
      particle.innerHTML = ['🤌'];
      particle.style.fontSize = `${Math.random() * 24 + 20}px`;
      width = height = 'auto';
      break;

    case 'pizza':
      particle.style.backgroundImage = 'url(pizza-logo.png)';
      break;
  }

  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;
  const animation = particle.animate(
    [
      {
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
        opacity: 1,
      },
      {
        transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${
          y + destinationY
        }px) rotate(${rotation}deg)`,
        opacity: 1,
      },
    ],
    {
      // duration: Math.random() * 1000 + 5000,
      duration: 2000,
      // easing: 'cubic-bezier(0, .9, .57, 1)',
      // delay: delay,
    }
  );
  animation.onfinish = removeParticle;
}
function removeParticle(e) {
  e.srcElement.effect.target.remove();
}

document
  .querySelectorAll('div')
  .forEach((div) => div.addEventListener('click', pop));
