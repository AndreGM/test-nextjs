import { Button } from "@/components/ui/button";
import { Github, ShoppingCart, Code2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center py-16 px-8">

        <div className="flex w-full flex-col items-center gap-8 text-center">


          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white leading-tight">
            Products
          </h1>


          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Web application developed with <strong>Next.js</strong> and <strong>TypeScript</strong> that implements a complete product CRUD, using the FakeStore API
          </p>


          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                <ShoppingCart className="mr-2 h-5 w-5" />
                View Products
              </Button>
            </Link>
            <a href="https://github.com/AndreGM/test-nextjs" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="cursor-pointer">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </a>
          </div>


          <div className="grid md:grid-cols-2 gap-6 mt-12 w-full max-w-3xl">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">Features</h3>
              <ul className="space-y-2 text-left text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span>Product listing and viewing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span>Create, edit and delete</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span>Responsive interface</span>
                </li>
              </ul>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">Technologies</h3>
              <ul className="space-y-2 text-left text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <span>Next.js with TypeScript</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <span>Tailwind CSS & shadcn/ui</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <span>TanStack Query & React Hook Form</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
