import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding mock blogs and articles...');

  // Mock Blogs
  await prisma.contentPost.create({
    data: {
      slug: 'understanding-zero-trust-architecture-2026',
      type: 'BLOG',
      title: 'Understanding Zero Trust Architecture in 2026',
      excerpt: 'A comprehensive guide to why perimeter-based security is dead and how modern organizations are adopting Zero Trust.',
      content: '<h2>The Death of the Perimeter</h2><p>In modern enterprise environments, the concept of a "trusted internal network" is obsolete. Zero Trust operates on the principle of "never trust, always verify."</p><h3>Key Pillars</h3><ul><li>Identity Verification</li><li>Device Posture Checks</li><li>Micro-segmentation</li></ul><p>By implementing these pillars, organizations can drastically reduce their attack surface and prevent lateral movement in the event of a breach.</p>',
      coverImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      category: 'Cybersecurity',
      author: 'Jane Doe',
      readTime: '6 Min Read',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    }
  });

  await prisma.contentPost.create({
    data: {
      slug: 'future-of-ai-in-workforce-development',
      type: 'BLOG',
      title: 'The Future of AI in Workforce Development',
      excerpt: 'How artificial intelligence is reshaping technical upskilling and the tools we use to learn.',
      content: '<h2>AI-Driven Personalized Learning</h2><p>Gone are the days of one-size-fits-all training modules. AI now allows us to analyze a learner\'s pace and automatically adjust the curriculum to focus on their weakest areas.</p><h3>What this means for teams</h3><p>Technical teams can onboard faster and stay ahead of the curve without wasting time on redundant coursework.</p>',
      coverImageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      category: 'L&D',
      author: 'John Smith',
      readTime: '4 Min Read',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    }
  });

  // Mock Articles
  await prisma.contentPost.create({
    data: {
      slug: 'implementing-oauth2-microservices',
      type: 'ARTICLE',
      title: 'Implementing OAuth2 in a Microservices Architecture',
      excerpt: 'A deep technical dive into securing service-to-service communication using OAuth2 and JWTs.',
      content: '<h2>The Problem with Monolithic Auth</h2><p>When breaking down a monolith, authentication becomes distributed. You can no longer rely on a single session cookie.</p><h3>The Solution: Token Exchange</h3><p>Using OAuth2 Client Credentials grant for service-to-service auth ensures that every internal request is cryptographically signed and verified at the API Gateway.</p><pre><code>// Example Node.js verification\nconst jwt = require("jsonwebtoken");\njwt.verify(token, process.env.PUBLIC_KEY);</code></pre>',
      coverImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      category: 'Architecture',
      author: 'Alice Johnson',
      readTime: '8 Min Read',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    }
  });

  await prisma.contentPost.create({
    data: {
      slug: 'data-mesh-vs-data-lake-practical-guide',
      type: 'ARTICLE',
      title: 'Data Mesh vs Data Lake: A Practical Guide',
      excerpt: 'Comparing modern data architectures to help you choose the right pattern for your scale.',
      content: '<h2>Centralized vs Decentralized</h2><p>A Data Lake centralizes data into one massive repository, while a Data Mesh decentralizes ownership to individual domain teams.</p><h3>When to choose what?</h3><ul><li><strong>Data Lake:</strong> Best for smaller teams with a central data engineering pod.</li><li><strong>Data Mesh:</strong> Best for large enterprises where domain teams produce their own data products.</li></ul>',
      coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      category: 'Data Science',
      author: 'Bob Williams',
      readTime: '10 Min Read',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    }
  });

  console.log('Successfully seeded 2 blogs and 2 articles!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
