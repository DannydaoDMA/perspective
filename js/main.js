
let text = document.querySelector(".text");
let fly = text.innerText.split("");
let space = " ";

for (var i = 0; i < fly.length; i++) {
    if (fly[i] !=" ") {
        space += '<div style="position:relative;display:inline-block;">' + fly[i] + '</div>';
    } else {
        space += fly[i];
    }
}

text.innerHTML = space;
let names = text.getElementsByTagName("div");

let tl = gsap.timeline({
    // scrollTrigger: {
    //     trigger: ".text",
    //     start: "top center",
    //     end: "bottom center",
    //     scrub: 1,
    //     ease: "power1.inOut"
    // }
    repeat: -1,
    repeatDelay: 5,
    yoyo: true
});

tl.set(".text", {prespective: 400});
tl.from(names,{
    duration:1.5,
    opacity:0,
    x:gsap.utils.random(-300,300,true),
    y:gsap.utils.random(-100,400,true),
    z:gsap.utils.random(100,300,true),

    stagger: {
        amount: 3
    }
})
