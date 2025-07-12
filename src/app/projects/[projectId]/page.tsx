
interface Props {
    params: {
        projectId: string;
    };
}

const Project = async ({ params }: Props) => {
    const { projectId } = params;
  return (
    <div>
      <h1>Project Page</h1>
      <p>Project ID: {projectId}</p>
    </div>
  );
};

export default Project;
