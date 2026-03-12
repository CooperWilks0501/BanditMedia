import { ArrowUpRight } from "lucide-react";
import { Button } from "../components/common/Button";
import { Reveal } from "../components/common/Reveal";
import { PageHero } from "../components/sections/PageHero";
import { portfolioProjects } from "../data/siteContent";

export function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected work, structured for future case studies."
        description="The portfolio is ready for real projects later, but already framed to present work with clarity, restraint, and strong visual hierarchy."
        aside={
          <>
            <span className="eyebrow">Future Ready</span>
            <p>Project content is driven from editable data, making it straightforward to swap placeholders for real case studies.</p>
          </>
        }
      />

      <section className="section">
        <div className="container portfolio-grid">
          {portfolioProjects.map((project) => (
            <Reveal key={project.name} className="portfolio-card panel">
              <div className="portfolio-card__visual" style={{ background: project.accent }}>
                <div className="portfolio-card__overlay">
                  <span>{project.category}</span>
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <div className="portfolio-card__body">
                <h2>{project.name}</h2>
                <p>{project.goal}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--contrast">
        <div className="container split-panel">
          {portfolioProjects.slice(0, 3).map((project, index) => (
            <Reveal key={project.name} className="panel case-preview">
              <span className="eyebrow">Case Study / 0{index + 1}</span>
              <h3>{project.name}</h3>
              <p>{project.goal}</p>
              <div className="tag-row">
                <span>{project.category}</span>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section final-cta">
        <div className="container final-cta__inner panel">
          <div>
            <span className="eyebrow">Have A Project?</span>
            <h2>Let’s make your brand look more established online.</h2>
            <p>Bandit Media builds premium digital experiences that are easier to trust at first glance.</p>
          </div>
          <Button to="/quote">Start a Project</Button>
        </div>
      </section>
    </>
  );
}
