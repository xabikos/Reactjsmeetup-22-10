const firstThreadMessagesNumber = 10;
const secondThreadMessagesNumber = 40;
let threads = [];

let firstThreadMessages = [];
_.times(firstThreadMessagesNumber, m => {
  firstThreadMessages.push(Immutable.Map({
    id: m,
    text: `Message Text ${m}`,
    meta: Immutable.Map({
     delivered: m%2 === 0,
     seen: m%4 ===0
    })
  }));
});

threads.push({
  threadId: 1,
  title: 'The thread with a few messages',
  messages: Immutable.List(firstThreadMessages)
});

let secondThreadMessages = [];
_.times(secondThreadMessagesNumber, m => {
  secondThreadMessages.push(Immutable.Map({
    id: m,
    text: `Message Text ${m}`,
    meta: Immutable.Map({
      delivered: m%2 === 0,
      seen: m%4 ===0
    })
  }));
});
threads.push({
  threadId: 2,
  title: 'The thread with many more messages',
  messages: Immutable.List(secondThreadMessages)
});

let updateThreadsCB;

const stateManager = {
  state: threads,
  registerCallback: (cb) => {
    updateThreadsCB = cb;
  },
  markMessageAsSeen: (threadId, messageId) => {
    const currentMessage = threads[threadId-1].messages.get(messageId -1);
    
    const currentValue = currentMessage.get('meta').get('seen');
    
    const updatedMap = currentMessage.setIn(['meta', 'seen'], !currentValue);
    
    const newMessagesList = threads[threadId-1].messages.set(messageId-1, updatedMap);
    
    threads[threadId-1].messages = newMessagesList;
    updateThreadsCB();
  }
};

class Message extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    //return true;
    return this.props.message.hashCode() !== nextProps.message.hashCode();
  }
  render(){
    console.log('    rendering message');
    return (
      <div>
        <p>Id: <span>{this.props.message.get('id')}</span></p>
        <p>Text: <span>{this.props.message.get('text')}</span></p>
        <p>Delivered
        <input type="checkbox" disabled checked={this.props.message.get('meta').get('delivered')} />
        </p>
        <p>Seen
              <input type="checkbox" onChange={()=>{}} checked={this.props.message.get('meta').get('seen')} />
        </p>
      </div>
    );
  }
}

class MessageList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    //return true;
    return this.props.messages.hashCode() !== nextProps.messages.hashCode();
  }
  render(){
    const messages = this.props.messages.map(m=> {return <Message key={m.get('id')} message={m} />});
    return (
      <div>{messages}</div>
    );
  }
}

class Thread extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // TODO: return whether or not current chat thread is
    // different to former one.
    // A deep compoarison of the objects should be done here
    // foreach inside a foreach
    return true;
  }
                                             
  render(){
    console.log('rendering thread');
    return (
      <div>
        <p>Id: <strong>{this.props.threadId}</strong></p>
        <p>Title: <strong>{this.props.title}</strong></p>
        <MessageList messages={this.props.messages} />
      </div>
    );
  }
}

class ThreadsList extends React.Component {
  render() {
    return (
      <div>
        <div className="leftside">
          <Thread {...threads[0]} />
        </div>
        <div className="rightside">
          <Thread {...threads[1]} />
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      threads: this.props.threads
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount(){
    stateManager.registerCallback(this.handleChange);
  }
  
  handleChange(){
    this.setState(stateManager.state);
  }
  
  render(){
    return (
      <div>
        <button onClick={() => {stateManager.markMessageAsSeen(1,1);}}>Toggle first message seen</button>
        <ThreadsList threads={this.state.threads} />
      </div>
    );
  }
}

function renderComponent() {
  React.render(<App threads={threads} />, document.getElementById('app'));
}

renderComponent();