import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import Hero from "../../components/homeComponents/Hero";
import About from "../../components/homeComponents/About";
import Features from "../../components/homeComponents/Features";
import CtaSection from "../../components/homeComponents/CtaSection";
import { useSpeechSynthesis } from "react-speech-kit";
import useStore from "../../store/store";

export default function Home() {
  const [open, setOpen] = React.useState(false);

    const uid = useStore((state) => state.userUid);
    const [value, setValue] = React.useState(
        "Welcome to cognicare,  I am your AI Companion, Kindly check your HomeWork"
    );
    const { speak } = useSpeechSynthesis();

    Aos.init({
        duration: 1800,
        offset: 0,
    });
    return (
        <div className="overflow-hidden">
            <button onClick={() => speak({ text: value })}>Speak</button>
            <Hero />
            <About />
            <Features />
            <CtaSection />
        </div>
    );
}
