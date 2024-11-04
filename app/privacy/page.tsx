"use client";

import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BrainCircuit,
  Shield,
  Lock,
  Eye,
  Key,
  Server,
  Users,
  ArrowRight,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background light">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <BrainCircuit className="w-8 h-8" />
            <span className="text-2xl font-bold">Brainwave</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </nav>
      </header>

      <main className="pt-24">
        <section className="py-20 px-6 bg-muted/50">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Lock className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Privacy is Our Foundation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We believe privacy isn't just a feature—it's a fundamental
                right. Every aspect of Brainwave is built with your privacy and
                security in mind.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {[
                {
                  icon: <Shield className="w-8 h-8 mb-4" />,
                  title: "End-to-End Encryption",
                  description:
                    "Your data is encrypted at rest and in transit, ensuring complete privacy.",
                },
                {
                  icon: <Eye className="w-8 h-8 mb-4" />,
                  title: "Transparent Practices",
                  description:
                    "We're clear about how we handle your data and who has access to it.",
                },
                {
                  icon: <Key className="w-8 h-8 mb-4" />,
                  title: "User Control",
                  description:
                    "You maintain full control over your data and how it's used.",
                },
              ].map((item, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    {item.icon}
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-8">
              <div className="prose prose-gray max-w-none">
                <h2 className="text-3xl font-bold mb-6">
                  Our Privacy Commitment
                </h2>
                <p className="text-muted-foreground">
                  At Brainwave, we understand that privacy is paramount,
                  especially in educational settings. We've built our platform
                  from the ground up with privacy as a core tenet, ensuring that
                  your data is protected at every step.
                </p>
              </div>

              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Service Providers
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We carefully select our service providers based on their
                    commitment to security and privacy:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold">Vercel:</span>
                        <span className="text-muted-foreground">
                          {" "}
                          Hosts our application infrastructure with
                          enterprise-grade security.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold">Cloudflare:</span>
                        <span className="text-muted-foreground">
                          {" "}
                          Provides DDoS protection and ensures secure content
                          delivery.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold">Supabase:</span>
                        <span className="text-muted-foreground">
                          {" "}
                          Manages our database with end-to-end encryption and
                          robust security measures.
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="data-collection">
                  <AccordionTrigger>What Data We Collect</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Basic account information (name, email)</li>
                      <li>• Learning preferences and progress data</li>
                      <li>• Usage statistics to improve our service</li>
                      <li>• Technical information for service optimization</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="data-use">
                  <AccordionTrigger>How We Use Your Data</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Personalizing your learning experience</li>
                      <li>• Improving our educational algorithms</li>
                      <li>
                        • Providing progress reports to authorized teachers
                      </li>
                      <li>• Maintaining and optimizing our services</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="data-rights">
                  <AccordionTrigger>Your Rights and Controls</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Access your data at any time</li>
                      <li>• Request data deletion</li>
                      <li>• Opt out of non-essential data collection</li>
                      <li>• Export your data in standard formats</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="security">
                  <AccordionTrigger>Security Measures</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• End-to-end encryption for all data</li>
                      <li>• Regular security audits and penetration testing</li>
                      <li>• Multi-factor authentication options</li>
                      <li>• Real-time threat monitoring and prevention</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-muted">
          <div className="container mx-auto max-w-4xl text-center">
            <Users className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Have Questions About Your Privacy?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our dedicated privacy team is here to help you understand how we
              protect your data.
            </p>
            <Link href="mailto:privacy@arctix.dev">
              <Button size="lg">Contact Privacy Team</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-background py-12 px-6 border-t">
        <div className="container mx-auto max-w-4xl text-center text-muted-foreground">
          <p className="mb-4">
            © {new Date().getFullYear()} Brainwave. All rights reserved.
          </p>
          <p className="text-sm">
            Crafted with ❤️ by{" "}
            <a
              href="https://arctix.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              arctix.dev
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
