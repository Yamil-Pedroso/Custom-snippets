import React from 'react';
import styled from 'styled-components';
import { FaHeart } from "react-icons/fa";

// Estilos
const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 3rem 2rem;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Column = styled.div`
  flex: 1;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const ColumnTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #ff7225;
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.5rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #ff8a4a;
    }
  }
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  a {
    color: #fff;
    font-size: 1.5rem;
    transition: color 0.3s;

    &:hover {
      color: #ff7225;
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #aaa;

  a {
    color: #ff7225;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #fff;
    }
  }
`;

import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Columna 1 */}
        <Column>
          <ColumnTitle>About Us</ColumnTitle>
          <p>
            We are dedicated to helping developers save, organize, and share code snippets efficiently.
          </p>
        </Column>

        {/* Columna 2 */}
        <Column>
          <ColumnTitle>Quick Links</ColumnTitle>
          <LinksList>
            <LinkItem>
              <a href="/pricing">Pricing</a>
            </LinkItem>
            <LinkItem>
              <a href="/features">Features</a>
            </LinkItem>
            <LinkItem>
              <a href="/blog">Blog</a>
            </LinkItem>
            <LinkItem>
              <a href="/contact">Contact</a>
            </LinkItem>
          </LinksList>
        </Column>

        {/* Columna 3 */}
        <Column>
          <ColumnTitle>Follow Us</ColumnTitle>
          <SocialMedia>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </SocialMedia>
        </Column>
      </FooterContent>

      {/* Parte Inferior */}
      <FooterBottom>
        <p>
          &copy; {new Date().getFullYear()} Custom Snippets. All Rights Reserved. Built with
            <FaHeart style={{ color: '#ff7225', marginLeft: ".3rem", marginRight: ".3rem" }} />
           by
          <a href="https://yampe-softwaredev.netlify.app/"> YamNextGen</a>.
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
