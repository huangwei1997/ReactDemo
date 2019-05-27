import React,{PureComponent} from 'react';
import "./List.css"
class List extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            toDoList:[
                {
                    id:1,
                    content:'running',
                    done:false,
                },
                {
                    id:2,
                    content:'yoga',
                    done:false,
                }
            ],
            currLine: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({currLine:e.target.value})
    }

    handleAddClick(){
        const task = this.state.currLine
        const initList = this.state.toDoList;
        const newList = initList.concat([{
            id:initList.length + 1,
            content:task,
            done:false,
        }]);

        this.setState({toDoList:newList,currLine:''});
    }

    handleDelClick(id){
        //console.log(id);
        this.setState({
            toDoList:this.state.toDoList.filter((_,i) => i!== id)
        })
    }

    handleFinishClick(id){
        console.log(id);
        const currList = this.state.toDoList;
        currList[id].done = true;
        this.setState({
            toDoList:currList,
        });
        this.forceUpdate();
    }

    render(){
        const currLine = this.state.currLine;
        return(
            <div>
                <h1>TODO List</h1>
                <div className={'list-wrapper'}>
                    {
                        this.state.toDoList.map(i=>{
                            if(i.done === false){
                                return(
                                    <div className={'itemDiv'} key={i.id}>
                                        <p className={'item'}>{i.id}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                        <p className={'item'} onClick={this.handleFinishClick.bind(this,i.id-1)}>{i.content}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                        <button className={'delButton'} onClick={this.handleDelClick.bind(this,i.id-1)}>x</button>
                                    </div>
                                )
                            }else{
                                return(
                                    <div className={'itemDiv'} key={i.id}>
                                        <p className={'item'}><s>{i.id}&nbsp;&nbsp;&nbsp;&nbsp;</s></p>
                                        <p className={'item'} onClick={this.handleFinishClick.bind(this,i.id-1)}><s>{i.content}</s>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                        <button className={'delButton'} onClick={this.handleDelClick.bind(this,i.id-1)}>x</button>
                                    </div>
                                )
                            }

                        })
                    }
                </div>
                <div className={'addDiv'}>
                    <input type="text" value={currLine} onChange={this.handleChange.bind(this)} />
                    <button onClick={this.handleAddClick.bind(this)}>add</button>
                </div>
            </div>

        )
    }
}

export default List



