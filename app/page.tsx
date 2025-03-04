"use client";

import { useState, useEffect, Suspense } from "react";
import { Link } from "next-view-transitions";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BrainCircuit,
  BookOpen,
  Shield,
  Users,
  Zap,
  Github,
  MonitorSmartphone,
  GraduationCap,
  School,
} from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";

function RedirectToCode() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  if (code) {
    redirect("/auth/callback?code=" + code);
  }

  return null;
}

export default function BrainwaveLanding() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Suspense fallback={null}>
        <RedirectToCode />
      </Suspense>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <BrainCircuit className="w-8 h-8" />
            <span className="text-2xl font-bold">Brainwave</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="#features">
              <Button variant="ghost">Features</Button>
            </Link>
            <Link href="/privacy">
              <Button variant="ghost">Privacy</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-24">
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Empower Education with AI
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Brainwave: The AI assistant designed for schools, fostering
              learning without compromising integrity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/sign-up">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6" id="features">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Features that Inspire
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                // {
                //   icon: <BookOpen className="w-8 h-8 mb-4" />,
                //   title: "Smart Study Guides",
                //   description:
                //     "AI-generated study materials tailored to each student's needs.",
                // },
                {
                  icon: <Shield className="w-8 h-8 mb-4" />,
                  title: "Privacy First",
                  description:
                    "End-to-end encryption and strict data protection measures.",
                },
                {
                  icon: <Users className="w-8 h-8 mb-4" />,
                  title: "Collaborative Learning",
                  description:
                    "Foster teamwork with AI-moderated group discussions.",
                },
                {
                  icon: <Zap className="w-8 h-8 mb-4" />,
                  title: "Instant Feedback",
                  description:
                    "Real-time assessment and constructive feedback on assignments.",
                },
                {
                  icon: <MonitorSmartphone className="w-8 h-8 mb-4" />,
                  title: "Teacher Monitoring",
                  description:
                    "Allows teachers to track student progress and engagement.",
                },
                {
                  icon: <GraduationCap className="w-8 h-8 mb-4" />,
                  title: "Guided Assistance",
                  description:
                    "Helps students do their own work instead of doing it for them.",
                },
                {
                  icon: <School className="w-8 h-8 mb-4" />,
                  title: "LMS Integration",
                  description:
                    "Seamlessly integrates with Google Classroom and other LMS platforms.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      {feature.icon}
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Empowering Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">
                      AI-Powered Learning Assistant
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Brainwave uses cutting-edge AI to provide personalized
                      learning experiences, adapting to each student's unique
                      needs and learning style.
                    </p>
                    <Button disabled={true}>Learn More</Button>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="h-full">
                  <CardContent className="p-6 line-through">
                    <h3 className="text-xl font-semibold mb-2">
                      Quick Stats
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between ">
                        <span>Active Schools</span>
                        <span className="font-bold">500+</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Students Helped</span>
                        <span className="font-bold">100,000+</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Avg. Grade Improvement</span>
                        <span className="font-bold">15%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              Our Commitment to Privacy
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              At Brainwave, we believe in the power of AI to transform education
              while fiercely protecting the privacy of students and educators.
            </p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {[
                {
                  title: "Data Encryption",
                  description:
                    "All data is encrypted end-to-end, ensuring your information stays private.",
                },
                {
                  title: "No Data Selling",
                  description:
                    "We never sell your data. Your information is yours and yours alone.",
                },
                {
                  title: "Transparent Practices",
                  description:
                    "Our privacy policy is clear, concise, and always accessible.",
                },
              ].map((item, index) => (
                <Card key={index} className="text-left">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
            <div className="w-full items-center flex justify-center">
              <Link href="/privacy" className="mt-10">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent hover:bg-primary-foreground hover:text-primary"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Join the AI revolution in education. Empower your students and
              teachers with Brainwave.
            </p>
            <div className="flex justify-center space-x-4">
              {/* <Link href="/sign-up">
                <Button size="lg" variant="secondary">
                  Learn More
                </Button>
              </Link> */}
              <Link href="mailto:demo@arctix.dev">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent hover:bg-primary-foreground hover:text-primary"
                >
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center space-x-2">
            <BrainCircuit className="w-8 h-8" />
            <span className="text-2xl font-bold">Brainwave</span>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://github.com/arctixdev/brainwave"
              className="text-muted-foreground hover:text-foreground flex items-center"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-muted-foreground text-sm">
            Crafted with ❤️ by{" "}
            <a
              href="https://arctix.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              arctix.dev
            </a>
          </div>
        </div>
      </footer>

      <div
        className="fixed bottom-4 right-4 text-xs text-muted-foreground pointer-events-none"
        style={{ opacity: Math.max(0, Math.min(1, scrollY / 500)) }}
      >
        Designed by arctix.dev
      </div>
    </div>
  );
}
