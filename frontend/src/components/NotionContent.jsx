import React from 'react';

const NotionContent = ({ content }) => {
  console.log("Content:", content);
  const renderBlock = (block) => {
    const { type } = block;
    console.log("Block type:", type);
    switch (type) {
      case 'paragraph':
        return (
          <p className="mb-4">
            {block.paragraph.rich_text.map((text, index) => (
              <span
                key={index}
                className={`
                  ${text.annotations.bold ? 'font-bold' : ''}
                  ${text.annotations.italic ? 'italic' : ''}
                  ${text.annotations.strikethrough ? 'line-through' : ''}
                  ${text.annotations.underline ? 'underline' : ''}
                  ${text.annotations.code ? 'font-mono px-1 rounded' : ''}
                `}
              >
                {text.text.content}
              </span>
            ))}
          </p>
        );

      case 'heading_1':
        return (
          <h1 className="text-8xl font-bold mb-4">
            {block.heading_1.rich_text[0]?.text.content}
          </h1>
        );

      case 'heading_2':
        return (
          <h2 className="text-4xl font-bold mb-3 text-[#cf0]">
            {block.heading_2.rich_text[0]?.text.content}
          </h2>
        );

      case 'heading_3':
        return (
          <h3 className="text-xl font-bold mb-2">
            {block.heading_3.rich_text[0]?.text.content}
          </h3>
        );

      case 'bulleted_list_item':
        return (
          <li className="ml-6 mb-1 list-disc">
            {block.bulleted_list_item.rich_text.map((text, index) => (
              <span key={index}>{text.text.content}</span>
            ))}
          </li>
        );

      case 'numbered_list_item':
        return (
          <li className="ml-6 mb-1 list-decimal">
            {block.numbered_list_item.rich_text.map((text, index) => (
              <span key={index}>{text.text.content}</span>
            ))}
          </li>
        );

      case 'code':
        return (
          <pre className="bg-[#222] text-[#cf0] p-4 rounded-lg mb-4 overflow-x-auto">
            <code className="text-sm font-mono">
              {block.code.rich_text[0]?.text.content}
            </code>
          </pre>
        );

      case 'quote':
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
            {block.quote.rich_text[0]?.text.content}
          </blockquote>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full flex items-center justify-center mx-auto p-8">
      <div className="max-w-4xl">
        {content?.map((block) => (
          <div key={block.id}>
            {renderBlock(block)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotionContent; 