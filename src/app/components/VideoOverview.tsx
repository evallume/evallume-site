const VideoOverview = () => (
  <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden m-0 p-0 border-none">
    {/* Видео на десктопе */}
    <video
      className="hidden md:block absolute inset-0 w-full h-full object-cover rounded-3xl"
      src="https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/Video/view-desktop1-CGKlmMfaAOiakHuIFv9zqW8saWY5Zt.mp4"
      autoPlay
      loop
      muted
      playsInline
      controls={false}
    />
    {/* Видео на мобилке */}
    <video
      className="block md:hidden absolute inset-0 w-full h-full object-cover rounded-2xl"
      src="https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/Video/overview-mobile-2IB2EcWNxtAlCzEvlXvo1lihgIEihR.mp4"
      autoPlay
      loop
      muted
      playsInline
      controls={false}
    />
  </section>
);

export default VideoOverview;
