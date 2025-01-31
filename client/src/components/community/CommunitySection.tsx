import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Estilos
const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 3rem;
  color: #666;
`;

const BlogContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const BlogCard = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 26rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
  text-align: left;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #ff7225;
`;

const BlogDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
`;

const BlogLink = styled.a`
  display: inline-block;
  font-size: 1rem;
  color: #ff7225;
  text-decoration: none;
  font-weight: bold;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const CommunitySection: React.FC = () => {
  const blogPosts = [
    {
      title: '5 Snippets Every Developer Should Know',
      description: 'Learn about the most useful snippets for your projects.',
      image: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/blog1',
    },
    {
      title: 'How to Organize Your Code Like a Pro',
      description: 'Tips and tricks to keep your codebase clean and efficient.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFBlb3BsZSUyMHByb2dyYW1taW5nfGVufDB8fDB8fHww',
      link: '/blog2',
    },
    {
      title: 'Join Our Community on GitHub',
      description: 'Collaborate and share ideas with fellow developers.',
      image: 'https://plus.unsplash.com/premium_photo-1682130147350-c1f80c968967?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGVvcGxlJTIwcHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D',
      link: '/blog3',
    },
  ];

  return (
    <Section>
      <Title>Community & Blog</Title>
      <Subtitle>Discover articles, tips, and join our community to grow as a developer.</Subtitle>
      <BlogContainer>
        {blogPosts.map((post, index) => (
          <BlogCard key={index}>
            <BlogImage src={post.image} alt={post.title} />
            <BlogContent>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogDescription>{post.description}</BlogDescription>
              <BlogLink href={post.link} rel="noopener noreferrer">
                 <Link to={post.link}>Read More</Link>
              </BlogLink>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogContainer>
    </Section>
  );
};

export default CommunitySection;
