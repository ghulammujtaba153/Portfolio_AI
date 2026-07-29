/** Brand logos via Simple Icons CDN */
export type SkillLogoId =
  | "react"
  | "react-native"
  | "next"
  | "node"
  | "mongo"
  | "aws"
  | "docker"
  | "fastapi"
  | "langgraph"
  | "redux"
  | "nestjs"
  | "tailwind"
  | "graphql"
  | "socket"
  | "mysql"
  | "git";

export const skillLogoSrc: Record<SkillLogoId, string> = {
  next: "https://cdn.simpleicons.org/nextdotjs/C4C4CC",
  node: "https://cdn.simpleicons.org/nodedotjs/8B8B93",
  mongo: "https://cdn.simpleicons.org/mongodb/8B8B93",
  aws: "https://cdn.simpleicons.org/amazonaws/C4C4CC",
  docker: "https://cdn.simpleicons.org/docker/8B8B93",
  fastapi: "https://cdn.simpleicons.org/fastapi/C4C4CC",
  langgraph: "https://cdn.simpleicons.org/langchain/C4C4CC",
  redux: "https://cdn.simpleicons.org/redux/8B8B93",
  nestjs: "https://cdn.simpleicons.org/nestjs/C4C4CC",
  tailwind: "https://cdn.simpleicons.org/tailwindcss/8B8B93",
  graphql: "https://cdn.simpleicons.org/graphql/C4C4CC",
  socket: "https://cdn.simpleicons.org/socketdotio/C4C4CC",
  mysql: "https://cdn.simpleicons.org/mysql/8B8B93",
  git: "https://cdn.simpleicons.org/git/C4C4CC",
  react: "https://cdn.simpleicons.org/react/C4C4CC",
  "react-native": "https://cdn.simpleicons.org/react/C4C4CC",
};

export function logoForSkillName(name: string): SkillLogoId | null {
  const map: Record<string, SkillLogoId> = {
    "React.js": "react",
    "React Native": "react-native",
    "React Native CLI": "react-native",
    "Next.js": "next",
    "Node.js": "node",
    MongoDB: "mongo",
    AWS: "aws",
    Docker: "docker",
    FastAPI: "fastapi",
    LangGraph: "langgraph",
    Redux: "redux",
    "Redux Toolkit": "redux",
    NestJS: "nestjs",
    "Tailwind CSS": "tailwind",
    GraphQL: "graphql",
    "Socket.io": "socket",
    MySQL: "mysql",
    "Git & Github": "git",
  };
  return map[name] ?? null;
}
