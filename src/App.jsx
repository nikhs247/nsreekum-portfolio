import React, { useState } from 'react';
import { 
  Github, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  MapPin, 
  Linkedin, 
  Award, 
  BookOpen, 
  Briefcase, 
  User, 
  Code,
  Terminal
} from 'lucide-react';

const App = () => {
  // --- NIKHIL SREEKUMAR UPDATED DATA ---
  const profile = {
    name: "Nikhil Sreekumar",
    title: "AI Systems Engineer @ Qen Labs",
    subtitle: "PhD in Computer Science & Engineering",
    institution: "University of Minnesota, Twin Cities",
    location: "Minneapolis, MN",
    email: "sreek026@umn.edu",
    bio: "I am a PhD graduate from the University of Minnesota specializing in ML systems optimization, distributed systems, and GPU computing. My research focuses on advancing energy-efficient ML inference and resource management for multi-tenant GPU environments. I recently defended my thesis on 'Application-aware Data Management in Edge Computing' and am starting as an AI Systems Engineer at Qen Labs.",
    socials: {
      github: "https://github.com/nsreekum",
      linkedin: "https://www.linkedin.com/in/sreekumarnikhil",
      scholar: "https://scholar.google.com/citations?user=V_4N7n0AAAAJ"
    }
  };

  const skills = [
    { category: "Languages", items: ["C++", "Go", "Python", "Kotlin", "MATLAB"] },
    { category: "Systems & ML", items: ["PyTorch", "TensorFlow", "GPU Isolation", "Docker", "Slurm", "gRPC"] }
  ];

  const experience = [
    {
      role: "AI Systems Engineer / R&D Technical Lead",
      org: "Qen Labs Inc / University of Minnesota",
      period: "2024 — Present",
      description: "Developing automated Slurm-based resource sanitization for NVIDIA VRAM and System RAM. Built 'Viveka', an ML input pipeline optimization system achieving ~70% energy savings, selected for US Navy SBIR Phase 2 funding."
    },
    {
      role: "Graduate Research Assistant",
      org: "University of Minnesota",
      period: "2019 — 2025",
      description: "Architected ASTRA (Best Paper @ IC2E 2025) and Armada frameworks. Focused on elastic resource management and latency-sensitive edge cloud optimization using Go, C++, and Docker."
    },
    {
      role: "Software Engineer",
      org: "MathWorks",
      period: "2016 — 2019",
      description: "Developed HDL Coder traceability features in C++ for hardware design verification. Optimized compiler intermediate representations for complex customer models."
    }
  ];

  const publications = [
    {
      title: "ASTRA: Association, Spatial proximity and Temporal Relevance based Adaptive prefetching for Edge AR",
      journal: "IEEE International Conference on Cloud Engineering (IC2E)",
      year: "2025",
      link: "https://arxiv.org/abs/2502.15192",
      authors: "N. Sreekumar, A. Chandra, J. Weissman",
      award: "Best Research Paper Award"
    },
    {
      title: "Haccs: Heterogeneity-aware clustered client selection for accelerated federated learning",
      journal: "IEEE International Parallel and Distributed Processing Symposium (IPDPS)",
      year: "2022",
      link: "#",
      authors: "J. Wolfrath, N. Sreekumar, D. Kumar, Y. Wang, A. Chandra"
    },
    {
      title: "Towards Elasticity in Heterogeneous Edge-dense Environments",
      journal: "IEEE International Conference on Distributed Computing Systems (ICDCS)",
      year: "2022",
      link: "#",
      authors: "L. Huang, Z. Liang, N. Sreekumar, S.K. Vishwanath, A. Chandra, J. Weissman"
    },
    {
      title: "Armada: A Robust Latency-Sensitive Edge Cloud in Heterogeneous Edge-Dense Environments",
      journal: "arXiv Preprint",
      year: "2021",
      link: "https://arxiv.org/abs/2111.12002",
      authors: "N. Sreekumar, et al."
    }
  ];

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
      <Icon size={20} className="text-blue-700" />
      <h2 className="text-xl font-semibold text-gray-800 tracking-tight">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar */}
        <aside className="md:w-1/3 space-y-6">
          <div className="sticky top-12">
            <div className="w-24 h-24 bg-blue-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg shadow-blue-200 overflow-hidden">
               NS
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile.name}</h1>
            <p className="text-blue-700 font-semibold mb-1">{profile.title}</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{profile.subtitle}</p>
            
            <div className="space-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href={`mailto:${profile.email}`} className="hover:text-blue-700 transition-colors underline underline-offset-4 decoration-gray-200">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-700 transition-all shadow-sm">
                <Github size={20} />
              </a>
              <a href={profile.socials.scholar} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-700 transition-all shadow-sm">
                <BookOpen size={20} />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-700 transition-all shadow-sm">
                <Linkedin size={20} />
              </a>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Core Skills</h4>
              {skills.map((s, i) => (
                <div key={i} className="mb-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">{s.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((item, ii) => (
                      <span key={ii} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px] font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:w-2/3 space-y-16">
          
          <section id="about">
            <SectionHeader icon={User} title="Summary" />
            <p className="text-gray-600 leading-relaxed text-lg">
              {profile.bio}
            </p>
          </section>

          <section id="experience">
            <SectionHeader icon={Briefcase} title="Experience" />
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l border-gray-200">
                  <div className="absolute -left-1 top-2 w-2 h-2 rounded-full bg-blue-700" />
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                    <h3 className="font-bold text-gray-800">{exp.role}</h3>
                    <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full self-start">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2 font-medium">{exp.org}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="publications">
            <SectionHeader icon={BookOpen} title="Selected Publications" />
            <div className="space-y-6">
              {publications.map((pub, i) => (
                <div key={i} className="group p-4 -mx-4 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      {pub.award && (
                        <div className="flex items-center gap-1.5 text-amber-600 text-[10px] font-bold uppercase tracking-wider mb-2">
                          <Award size={14} />
                          {pub.award}
                        </div>
                      )}
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1 leading-snug">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {pub.authors.split(', ').map((author, ai) => (
                          <span key={ai} className={author.includes("Sreekumar") ? "font-bold text-gray-700" : ""}>
                            {author}{ai < pub.authors.split(', ').length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase tracking-tight">{pub.journal}</span>
                        <span>•</span>
                        <span>{pub.year}</span>
                      </div>
                    </div>
                    {pub.link !== "#" && (
                      <a href={pub.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-700">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="pt-12 border-t border-gray-100 text-center text-gray-400 text-xs pb-12">
            <p>© {new Date().getFullYear()} {profile.name} • {profile.title}</p>
          </footer>

        </main>
      </div>
    </div>
  );
};

export default App;