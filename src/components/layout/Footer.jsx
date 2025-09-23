import { Button } from "@/components/ui/Button";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-white-500 to-white-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MP</span>
              </div>
              <span className="text-xl font-bold">MentorMap</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transform your communication with AI-powered video messages.
              Connect, collaborate, and create meaningful interactions that
              drive results.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/KhuswantRa45688"
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-2"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/khuswant-rajpurohit-b749ba30a/"
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-2"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/khuswant18"
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-2"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/college" className="hover:text-white transition-colors">
                  Explore Colleges
                </a>
              </li>
              <li>
                <a href="/mentorspage" className="hover:text-white transition-colors">
                  Explore Mentors 
                </a>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/student/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </a>
              </li>
              <li>
                <a href="/dashboard/mentor" className="hover:text-white transition-colors">
                  Mentor Dashboard
                </a>
              </li>
              <li>
                <a href="/mentorspage" className="hover:text-white transition-colors">
                  Mentor Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 MentorMap. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
