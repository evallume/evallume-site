"use client";
import Image from "next/image";

const stories = [
  {
    name: "Lindsey M.",
    city: "Los Angeles, CA",
    photo: "/clients/5.jpg",
    text: "We’ve been using Evallume’s diode laser Esthetician for over 6 months — it's a game changer. Safe for all skin types, super easy to operate, and our clients love the results!",
  },
  {
    name: "Dr. Jose Perez",
    city: "Miami, FL",
    photo: "/clients/7.jpg",
    text: "Evallume checked all the boxes: FDA clearance, excellent remote support, and real clinical results. Treatments are quick, comfortable, and patients keep coming back.",
  },
  {
    name: "Emil Chen",
    city: "New York, NY",
    photo: "/clients/8.jpg",
    text: "Setup was fast, the training is top-notch, and tech support actually picks up the phone. I recommend Evallume to colleagues — finally a brand that delivers.",
  },
  // Ещё истории...
];

export default function ClientsStories() {
  return (
    <section
      id="clients"
      className="py-8 md:py-12"
      aria-label="Evallume Client Success Stories"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Evallume Client Success Stories
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Hundreds of medspas, dermatologists, and estheticians across the USA trust Evallume to grow their business with FDA Certified laser technology.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((story, idx) => (
            <div key={idx} className="rounded-2xl shadow-md p-6 bg-neutral-50 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-primary/30">
                <Image
                  src={story.photo}
                  alt={story.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="italic text-gray-700 mb-4">“{story.text}”</p>
              <div className="font-semibold">{story.name}</div>
              <div className="text-sm text-gray-500">{story.city}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
