export type File = {
  name: string;
  type: "FILE" | "FOLDER";
  ext: string;
  content?: string;
  children: string;
  owner: string;
  collaborators: string[];
};
