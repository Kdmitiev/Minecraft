gsap.registerPlugin(ScrollSmoother, ScrollTrigger)
const sensitivity = 0.07
document.addEventListener("mousemove", (e) => {
    let dx = (e.clientX - window.innerWidth / 2) * sensitivity
    let dy = (e.clientY - innerHeight / 2) * sensitivity
    gsap.to(".layers__container", {
        duration: 1.5,
        x: dx,
        y: dy,
        rotationX: dy / 10,
        rotationY: dx / 10,
        ease: "power2.out"

    })
    gsap.to(".head-text", {
        duration: 1.5,
        x: -dx / 2,
        y: -dy / 2,
        ease: "power2.out"
    })
})
ScrollSmoother.create({
    wrapper: ".wrapper",
    content: ".wrapper-content",
    smooth: 1.5,
    effects: true
})
gsap.utils.toArray("section").forEach(section =>{
    gsap.fromTo(
        section,
        { opacity: 0, y: 25},
        { opacity: 1, y: 0, scrollTrigger:{
            trigger: section,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse"

        }},
    )
})


function initGallery(){
    let gallery = document.querySelector(".gallery")
    let galleryItems = document.querySelectorAll(".gallery-item")
    gallery.style.setProperty("--total-items", galleryItems.length)
    gallery.addEventListener("click", (event) => {
        let clicked = event.target.closest(".gallery-item")
        if (!clicked || clicked.classList.contains("active")) return

        galleryItems.forEach((item) =>{
            item.classList.remove("active")
        })
        clicked.classList.add("active")
    })
}
document.addEventListener("DOMContentLoaded", initGallery)


function initPlayer(){
    const btn=document.querySelector(".play-btn")
    const audio = document.getElementById("AudioPlayer")

    btn.addEventListener("click", ()=>{
        if (audio.paused){
            audio.play()
            btn.innerHTML = '<i class="fas fa-pause"></i>'

        }else {
            audio.pause()
            btn.innerHTML = '<i class="fas fa-play"></i>'
        }
    })
    const time = document.querySelector(".time")
    audio.addEventListener("timeupdate", ()=>{
        let minutes = Math.floor(audio.currentTime / 60)
        let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2,"0")
        let maxminutes = Math.floor(audio.duration / 60)
        let maxseconds = Math.floor(audio.duration % 60).toString().padStart(2,"0")
        time.innerHTML = `${minutes}:${seconds} / ${maxminutes}:${maxseconds}`
    })
}
document.addEventListener("DOMContentLoaded", initPlayer)