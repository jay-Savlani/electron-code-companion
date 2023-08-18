import ReactMarkdown from 'react-markdown';

// @ts-expect-error
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-expect-error
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IRenderMarkdownProps {
  analysis: string;
}

const RenderMarkdown = ({ analysis }: IRenderMarkdownProps) => {
  return (
    <ReactMarkdown
      className='text-dark'
      children={analysis}
      components={{
        code({ node, inline, className, children, ...props }) {
          console.log('classname', className);
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={oneDark}
              language={match[1]}
              PreTag='div'
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default RenderMarkdown;
