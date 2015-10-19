/*This file is the not transformed version of the script that is embeded inside undo html*/
class TextEditor extends React.Component {
  constructor(props){
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    
    this.state = {
      historyStuck: Immutable.List(),
      content: Immutable.Map({text: ""})
    };
  }
  
  componentDidMount() {
    const domNode = document.getElementById('editor');
    const editingText = Rx.Observable.fromEvent(domNode, 'keyup')
              .pluck('target', 'value')
              .debounce(1000);
    
    editingText.subscribe(text => {
      let txt = Immutable.Map({text: text});
      this.setState({
        historyStuck: this.state.historyStuck.push(txt)
      });
    });
  }
  
  handleChange(e) {
    this.setState({content: this.state.content.set('text', e.target.value)});
  }
  
  handleUndo() {
    const newStuck = this.state.historyStuck.pop();
    const newContent = newStuck.size !== 0 ? newStuck.last() : Immutable.Map({text: ""});
    this.setState({
      historyStuck: newStuck,
      content: newContent
    });
  }
  
  render() {
    let undoDisabled = this.state.historyStuck.size === 0;
    return (
      <div>
        <textarea id="editor" className="editor" value={this.state.content.get('text')} onChange={this.handleChange}/>
        <div className="button-holder">
          <button onClick={this.handleUndo}
            disabled={undoDisabled}>Undo</button>
        </div>
      </div>
    );
  }
  
} 

function renderComponent() {
  React.render(<TextEditor />, document.getElementById('app'));
}

renderComponent();



