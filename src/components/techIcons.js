import {
  SiSpringboot, SiFastapi, SiApachekafka, SiPostgresql, SiRedis, SiMysql, SiMongodb, SiDocker,
  SiPostman, SiOpencv, SiPython, SiJavascript, SiCplusplus, SiHtml5, SiCss3, SiGit, SiApachemaven,
  SiApachetomcat, SiReact, SiHibernate, SiJsonwebtokens, SiSpringsecurity, SiSpring, SiApache,
  SiTensorflow,
} from "react-icons/si";
import { FaJava, FaAws, FaDatabase, FaRobot, FaServer, FaCode, FaEye, FaBrain } from "react-icons/fa";

// Icon for each technology name used in data/profile.js. Anything without a
// brand icon gets a neutral glyph rather than a wrong logo.
const ICONS = {
  Java: FaJava,
  Python: SiPython,
  JavaScript: SiJavascript,
  "C++": SiCplusplus,
  SQL: FaDatabase,
  HTML: SiHtml5,
  CSS: SiCss3,
  "Spring Boot": SiSpringboot,
  FastAPI: SiFastapi,
  Microservices: FaServer,
  "REST APIs": FaCode,
  "Spring Security": SiSpringsecurity,
  JWT: SiJsonwebtokens,
  "Spring Data JPA": SiSpring,
  Hibernate: SiHibernate,
  Servlets: FaJava,
  JSP: FaJava,
  JDBC: FaDatabase,
  "JavaMail API": FaJava,
  "LLM Agents": FaRobot,
  RAG: FaBrain,
  OpenCV: SiOpencv,
  YOLO: FaEye,
  OCR: FaEye,
  EasyOCR: FaEye,
  PaddleOCR: FaEye,
  "Gemini AI": FaBrain,
  PostgreSQL: SiPostgresql,
  JSONB: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  "Apache Kafka": SiApachekafka,
  "Apache Tika": SiApache,
  AWS: FaAws,
  Docker: SiDocker,
  Git: SiGit,
  Maven: SiApachemaven,
  Tomcat: SiApachetomcat,
  Postman: SiPostman,
  React: SiReact,
  TensorFlow: SiTensorflow,
};

export function TechIcon({ name, ...props }) {
  const Icon = ICONS[name] || FaCode;
  return <Icon aria-hidden="true" {...props} />;
}

export function TechTag({ name }) {
  return (
    <span className="tag">
      <TechIcon name={name} />
      {name}
    </span>
  );
}
