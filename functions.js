class CreatorShape {

    async callApi(values, nameRoute) {

        let information
        if (nameRoute == "polyanets") {
            information = {
                candidateId: "5df36cd6-9413-4abd-9032-3cb72f649e56",
                row: values.row,
                column: values.column
            }
        } else if (nameRoute == "soloons") {
            information = {
                candidateId: "5df36cd6-9413-4abd-9032-3cb72f649e56",
                row: values.row,
                column: values.column,
                color: values.color
            }
        } else if (nameRoute == "comeths") {
            information = {
                candidateId: "5df36cd6-9413-4abd-9032-3cb72f649e56",
                row: values.row,
                column: values.column,
                direction: values.direction
            }
        }


        const request = await fetch(`https://challenge.crossmint.io/api/${nameRoute}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(information)
            })
        const response = await request.json()

        console.log(response)


        await new Promise(resolve => setTimeout(resolve, 500));

    }


    async getDataGoal() {
        const responseGoal = await fetch("https://challenge.crossmint.io/api/map/5df36cd6-9413-4abd-9032-3cb72f649e56/goal")

        const response = await responseGoal.json()

        return response.goal
    }


    createPattern(array) {

        let polyanet = []
        let soLoons = []
        let comETHs = []

        for (let i = 0; i < array.length - 1; i++) {

            for (let y = 0; y < array[i].length - 1; y++) {

                if (array[i][y].includes("POLYANET")) {
                    polyanet.push({ row: i, column: y })
                }
                else if (array[i][y].includes("SOLOON")) {
                    let color = array[i][y].split("_")
                    soLoons.push({ row: i, column: y, color: color[0].toLowerCase() })
                }
                else if (array[i][y].includes("COMETH")) {
                    let direction = array[i][y].split("_")
                    comETHs.push({ row: i, column: y, direction: direction[0].toLowerCase() });
                }
            }
        }
        return { polyanet: polyanet, soLoons: soLoons, comETHs: comETHs }
    }


    async sendCordenates(cordenates) {
        try {
            for (let i of cordenates.polyanet) {
                await this.callApi({ row: i.row, column: i.column }, "polyanets")
            }

            for (let i of cordenates.soLoons) {
                await this.callApi({ row: i.row, column: i.column, color: i.color }, "soloons")
            }

            for (let i of cordenates.comETHs) {
                await this.callApi({ row: i.row, column: i.column, direction: i.direction }, "comeths")
            }

            console.log('megaverse has been created!!')
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = CreatorShape