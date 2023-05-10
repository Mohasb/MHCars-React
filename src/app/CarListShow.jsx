import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarList from "../components/carList/CarList";

export default function CarListShow() {
  const savedData = JSON.parse(sessionStorage.getItem("data"));
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("data"));
    if (!savedData) {
      navigate("/");
    }
  }, [navigate]);

  gsap.registerPlugin("ScrollToPlugin");
//INITIALZING LOCOMOTIVE SCROLL
var scroll_one = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  lerp: 0.01,
  inertia: 0.135,
  scrollFromAnywhere: true,
  tablet: {
    breakpoint: 0
  }
});
// FOR BG ANIME ON SCROLL
gsap.to(".hp", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".hp",
    markers: 0,
    scrub: 1, //forced anyways
    end: "bottom top",
    start: "top top"
  }
});

// FOR 'MOTIVE' ANIME
let tl = gsap.timeline();
// tl.from(
//   "#on",
//   // { opacity: 0 },
//   {
//     opacity: 0,
//     scrollTrigger: {
//       trigger: "#on",
//       markers: 0,
//       scrub: 1, //forced anyways
//       end: "bottom 70%"
//     }
//   }
// );
// FOR MOTIVE BG ANIME
gsap.to("#mtiv", {
  backgroundSize: "100%",
  backgroundPosition: "50% 100%",
  scrollTrigger: {
    trigger: "#mtiv",
    markers: 0,
    scrub: 1,
    start: "top 95%"
  }
});
// FOR DOORS PIC TO SHRINK
gsap.to(".ith", {
  transform: "scale(.7)",
  opacity: 0.75,
  scrollTrigger: {
    trigger: ".ith",
    markers: 0,
    scrub: 1,
    start: "top 95%"
  }
});
gsap.to(".io", {
  transform: "scale(.7)",
  opacity: 0.75,
  scrollTrigger: {
    trigger: ".io",
    markers: 0,
    scrub: 1,
    start: "top 95%"
  }
});
gsap.to(".it", {
  transform: "scale(.8)",
  opacity: 0.75,
  scrollTrigger: {
    trigger: ".it",
    markers: 0,
    scrub: 1,
    start: "top 95%"
  }
});
// FOR 'SCROLL' ANIME
let tl2 = gsap.timeline();
// tl2.from(
//   "#scroll",
//   // { opacity: 0 },
//   {
//     opacity: 0,
//     scrollTrigger: {
//       trigger: "#scroll",
//       markers: 0,
//       scrub: 1,
//       end: "50% 50%"
//     }
//   }
// );
// FOR IMAGE ANIME
let imgs = document.querySelectorAll("img");
// imgs.forEach((e, i) => {
//   if (i != 0) {
//     console.log(e, i);
//     gsap.from(e, {
//       opacity: 0,
//       // x: gsap.utils.random(-20, 20),
//       scrollTrigger: {
//         trigger: e,
//         markers: 0,
//         scrub: 1,
//         end: "50% 50%"
//       }
//     });
//   }
// });
// FOR VIDEO ANIME
let videos = document.querySelectorAll(".vid");
// videos.forEach((e, i) => {
//   gsap.from(e, {
//     opacity: 0,
//     x: gsap.utils.random(-20, 20),
//     scrollTrigger: {
//       trigger: e,
//       markers: 0,
//       scrub: 1,
//       end: "50% 50%"
//     }
//   });
// });
window.onload = () => {
  gsap.to(".load_page", 0.5, {
    opacity: 0
  });
  gsap.to(".load_page", {
    display: "none",
    delay: 0.6
  });

  scroll_one.update();
  scroll_one.on("scroll", () => {
    ScrollTrigger.refresh();
  });
  // OPENING ANIME
  let otl = gsap.timeline({
    delay: 0.8
  });
  otl.fromTo(
    ".ho",
    2,
    {
      opacity: 0,
      y: 10
    },
    {
      opacity: 1,
      y: 0,
      ease: "expo.out"
    }
  );
  // SCROLL BACK AND FORTH ANIMATION
  let bafTick = 0;
  setInterval(() => {
    // if (bafTick === 0) {
    //   gsap.to(window, {scrollTo:".nOne"})
    // }
  }, 4000);
};


  return (
    <>
      {/* <main>
        {savedData && (
          <CarList cars={savedData.cars} booking={savedData.booking} />
        )}
      </main> */}
      {/* <!-- <div class="load_page"></div> --> */}
      <div class="loco" data-scroll data-scroll-container>
        <div class="hero" data-scroll data-scroll-section>
          <img
            class="hp"
            src="https://nek.netlify.app/assets/images/idk_color_clock_saudi.png"
            alt=""
            data-scroll
            data-scroll-speed="-3"
          />
          <h1 class="ho" data-scroll data-scroll-speed="-4">
            LOCO
          </h1>
        </div>
        <div class="nOne" id="mtiv" data-scroll data-scroll-section>
          <img
            class="ith"
            src="https://nek.netlify.app/assets/images/europe_street.png"
            alt=""
            data-scroll
            data-scroll-speed="-2"
            data-scroll-target=".nOne"
          />
          <img
            class="io"
            src="https://nek.netlify.app/assets/images/bndw_abandoned_doors_building.png"
            alt=""
            data-scroll
            data-scroll-speed="-5"
          />
          <img
            class="it"
            src="https://nek.netlify.app/assets/images/beach.png"
            alt=""
            data-scroll
            data-scroll-speed="-1"
          />
          <h1 class="no" id="on" data-scroll data-scroll-speed="-4">
            MOTIVE
          </h1>
        </div>
        <div class="nTwo" data-scroll data-scroll-section>
          <h1 class="no" id="scroll" data-scroll data-scroll-speed="15">
            SCROLL
          </h1>
          {/* <!--     <button class="btp" data-scroll data-scroll-speed="15">Back to top!</button> --> */}
          <video
            class="vid"
            src="https://nek.netlify.app/assets/abstract_bg_spiral.mp4"
            autoplay
            muted
            loop
            data-scroll
            data-scroll-speed="0"
          ></video>
        </div>
      </div>
    </>
  );
}
