import { Card, CardContent } from "@/components/ui/card";
import teamMember1 from "@/assets/AnshulD.png";
import teamMember2 from "@/assets/davidD.png";
import teamMember3 from "@/assets/RahulD.png";
import teamMember4 from "@/assets/ShobhitD.png";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}

const teamGroups = [
  {
    title: "Visionary Leadership",
    members: [
      {
        id: 2,
        name: "Anshul Thakur",
        position: "CEO & Founder",
        bio: "Visionary founder driving QuantraByte's mission with deep expertise in full-stack development and AI-driven solutions. Leading the charge in transforming innovative ideas into scalable, impactful products.",
        image: teamMember1,
      },
    ],
  },
  {
    title: "Innovation & Strategy",
    members: [
      {
        id: 1,
        name: "Jotheraj Kori",
        position: "CTO & Co-Founder",
        bio: "AI/ML pioneer and co-founder architecting cutting-edge solutions. Transforming complex data into actionable insights while building teams that deliver next-generation technology products.",
        image: teamMember2,
      },
    ],
  },

  {
    title: "Quality & Excellence",
    members: [
      {
        id: 3,
        name: "Rahul Gupta",
        position: "QA Director & Co-Founder",
        bio: "Co-founder committed to engineering excellence. Building quality-first processes and leading initiatives that ensure every product meets the highest standards of reliability and performance.",
        image: teamMember3,
      },
    ],
  },
  {
    title: "Development & Engineering",
    members: [
      {
        id: 4,
        name: "Shobhit Gotiya",
        position: "Lead Developer & Co-Founder",
        bio: "Co-founder and full-stack engineer building the technical backbone of QuantraByte. Specializing in modern React applications and creating seamless, intuitive user experiences.",
        image: teamMember4,
      },
    ],
  },
];

const Team = () => {
  return (
    <section id="team" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 fade-in-up">
              Meet Our <span className="text-gradient">Founders</span>
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              A team of visionary leaders and innovators dedicated to
              transforming ideas into scalable solutions. Driven by passion,
              expertise, and a shared commitment to excellence.
            </p>
          </div>

          {/* What Our Founders Say */}
          {/* Removed - All team members are founders */}

          {/* Team Groups */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamGroups.map((group, idx) => (
              <div
                key={group.title}
                className="fade-in-up"
                style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold mb-6 text-center text-gradient">
                  {group.title}
                </h3>
                {group.members.map((member) => (
                  <Card key={member.id} className="mb-8">
                    <CardContent className="flex flex-col items-center p-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-35 h-35 mb-4 object-cover shadow-quantum"
                      />
                      <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                      <p className="text-gradient font-medium mb-2">
                        {member.position}
                      </p>
                      <p className="text-muted-foreground text-sm mb-3 text-center">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>

          {/* Join Our Team CTA */}
          {/* <div className="text-center mt-20">
            <div
              className="bg-card rounded-2xl p-8 md:p-12 shadow-quantum fade-in-up"
              style={{ animationDelay: "1.2s" }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Join Our Team
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our
                passion for innovation. Join us in shaping the future of
                technology.
              </p>
              <a
                href="mailto:careers@QuantraByte.com"
                className="inline-flex items-center px-8 py-4 quantum-gradient hover:quantum-gradient-hover text-white font-semibold rounded-lg shadow-quantum glow-on-hover transition-all duration-300"
              >
                View Open Positions
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Team;
