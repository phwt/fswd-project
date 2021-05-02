interface Props {
  icon: string;
  title: string;
}

const PageTitle = ({ icon, title }: Props) => (
  <div className="text-center mt-4 mb-4">
    <h2>
      <i className={`fa fa-${icon}`} /> {title}
    </h2>
  </div>
);

export default PageTitle;
