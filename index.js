const CreatorShape = require("./functions")

const { promises: fs } = require('fs');


const callApi = async () => {

    const creatorShape = new CreatorShape()

    try {

        const pattern = await creatorShape.getDataGoal()
        const cordenates = creatorShape.createPattern(pattern)
        await creatorShape.sendCordenates(cordenates)

    }


    catch (e) {
        console.log(e)
    }
}




callApi()
