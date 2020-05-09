class Parent extends React.Component {
  state = {
    name: "Admin",
    age: 32,
    job: "Developer",
  };

  render() {
    return (
      <div>
        <Child1 dataFromParent={this.state.name}></Child1>
        <Child2 dataFromParent={this.state.age}></Child2>
        <Child3 dataFromParent={this.state.job}></Child3>
      </div>
    );
  }
}

class Child1 extends React.Component {
    render() {
            
            return (
                <div>
                    Moje ime je:{this.props.dataFromParent}
                </div>
            );
        }
    }