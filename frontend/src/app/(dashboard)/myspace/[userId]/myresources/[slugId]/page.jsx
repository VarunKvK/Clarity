"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NotionContent from '@/components/NotionContent';
import Loading from '@/components/mini_components/Loader';

const Page = () => {
  const { slugId } = useParams();
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotionPage = async () => {
      try {
        const response = await fetch(`/api/notion/${slugId}`);
        if (!response.ok) throw new Error('Failed to fetch page content');
        
        const data = await response.json();
        setPageContent(data.content);
      } catch (err) {
        console.error('Error fetching page:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotionPage();
  }, [slugId]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!pageContent) return <div>No content found</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <NotionContent content={pageContent} />
      </div>
    </div>
  );
};

export default Page;