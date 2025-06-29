const VideoOverview = () => (
  <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden m-0 p-0 border-none">
    {/* Видео на десктопе */}
    <video
      className="hidden md:block absolute inset-0 w-full h-full object-cover rounded-3xl"
      src="/video/overview-desktop.mp4"
      autoPlay
      loop
      muted
      playsInline
      controls={false}
    />
    {/* Видео на мобилке */}
    <video
      className="block md:hidden absolute inset-0 w-full h-full object-cover rounded-2xl"
      src="/video/overview-mobile.mp4"
      autoPlay
      loop
      muted
      playsInline
      controls={false}
    />
  </section>
);

export default VideoOverview;
