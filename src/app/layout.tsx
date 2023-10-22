import type { Metadata } from 'next'
import { ReactNode } from "react";
import { PageLayout } from "@/components/PageLayout/PageLayout";

export const metadata: Metadata = {
    title: 'Coin Counter',
    description: 'Counting coins using machine learning',
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
                integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
            <script src="https://cdn.roboflow.com/0.2.26/roboflow.js"></script>
        </head>
        <PageLayout>
            {children}
        </PageLayout>
        </html>
    )
}
