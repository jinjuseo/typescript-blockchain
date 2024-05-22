import crypto from "crypto";

interface BlockShape{
    hash:string;
    prevHash:string;
    height : number;
    data:string;
}

class Block implements BlockShape{
    public hash:string;
    constructor(
        public prevHash:string,
        public height : number,
        public data:string,
        //hash값은 prevHash, height, data값을 이용해서 계산됨 
        //-> 생성자에 없음
    ){
        this.hash = Block.calculateHash(prevHash,height, data);
    }
    static calculateHash(prevHash:string, height:number
        ,data:string){
            const toHash = `${prevHash}${height}${data}`;
            return crypto.createHash("sha256").update(toHash).digest("hex");
        }
}

class Blockchain{
    private blocks : Block[];
    constructor(){
        this.blocks = [];
    }
    private getPrevHash(){
        if(this.blocks.length ===0) return "";
        return this.blocks[this.blocks.length -1].hash;
    }
    public addBlock(data:string){
        const newBlock = new Block(this.getPrevHash(),this.blocks.length+1, data );
        this.blocks.push(newBlock);
    }
    public getBlocks(){
        //return this.blocks; -> 보안상 취약
        return [...this.blocks];
        //같은 데이터를 담고있지만 새로운 배열임  (주소값이 다름)
    }
}

const blockchain = new Blockchain();
blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

blockchain.getBlocks().push(new Block("xxx",11111,"HACKEDDDDD"));
//blocks를 리턴하면 문제 !! 
// getBlocks를 통해 리턴받은 배열에 접근가능
//새로운 데이터를 추가할 수 있음 => 보안상 취약

console.log(blockchain.getBlocks());




