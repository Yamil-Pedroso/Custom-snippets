import images from "../../assets"

const DemoVideo = () => {
  return (
    <video
        className="w-full"
        autoPlay
        loop
        muted
        playsInline
        controls
    >
        <source src={images.demoSnippets} type="video/mp4" />
        Your browser does not support the video tag
    </video>
  )
}

export default DemoVideo
