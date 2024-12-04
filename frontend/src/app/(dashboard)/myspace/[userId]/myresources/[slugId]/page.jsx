"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NotionContent from '@/components/NotionContent';
import Loading from '@/components/mini_components/Loader';

const Page = () => {
  const { slugId } = useParams();
  const [pageContent, setPageContent] = useState(null);
  const [pageProperties, setPageProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotionPage = async () => {
      try {
        const response = await fetch(`/api/notioncontent?slugId=${slugId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch page content');
        }
        
        const data = await response.json();
        console.log("Notion data from resource view:", data);
        
        if (data.error) {
          throw new Error(data.error);
        }

        setPageContent(data.content);
        setPageProperties(data.properties);
      } catch (err) {
        console.error('Error fetching page:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slugId) {
      fetchNotionPage();
    }
  }, [slugId]);

  if (loading) return <Loading />;
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 text-center">
        <h2 className="text-xl font-semibold">Error</h2>
        <p>{error}</p>
      </div>
    </div>
  );
  if (!pageContent) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">No content found</p>
    </div>
  );

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center mx-auto py-8">
        <NotionContent content={pageContent} />
      </div>
    </div>
  );
};

export default Page;