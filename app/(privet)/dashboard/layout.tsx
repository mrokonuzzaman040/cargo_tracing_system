import React from 'react';
import "../globals.css";

export const metadata = {
    title: 'Cargo Shipping Company',
    description: 'Cargo Shipping Company is a shipping company that provides shipping services to customers around the world.',
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="icon" href="/favicon.svg" />
            </head>
            <body>
                <div id="root">
                    
                    {children}
                </div>
            </body>
        </html>
    );
}
