type Props = { name: string; children: string };

const Todo = ({ name, children }: Props) => {
  return (
    <div
      id="tes"
      style={{
        background: "pink"
      }}
    >
      {name}-{children}
    </div>
  );
};

const tmp = <Todo name="John">abcd</Todo>;

const root = document.getElementById("root");
root.innerHTML = "";
root.append(tmp);

export default null;
