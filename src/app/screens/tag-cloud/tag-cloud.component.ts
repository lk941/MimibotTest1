import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ContatoService } from 'src/app/contatos1/shared/contato1.service';
import { jqxTagCloudComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtagcloud';
import { jqxDropDownButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownbutton';

@Component({
    selector: 'app-cloud',
    templateUrl: './tag-cloud.component.html',
    styleUrls: ['./tag-cloud.component.scss']
})

export class TagCloudComponent implements AfterViewInit {
    @ViewChild('myTagCloud') myTagCloud: jqxTagCloudComponent;
    @ViewChild('myDropDownButton1') myDropDownButton1: jqxDropDownButtonComponent;
    @ViewChild('myDropDownButton2') myDropDownButton2: jqxDropDownButtonComponent;
    constructor(private contatoService: ContatoService) { }
    bullyListArray = []
    reasons = [];

 	getWidth() : any {
		if (document.body.offsetWidth < 600) {
			return '90%';
		}
		return '100%';
    }
	
    ngAfterViewInit(): void {
        this.myDropDownButton1.setContent(this.getTextElementByColor(new jqx.color({ hex: '00AA99' })));
        this.myDropDownButton2.setContent(this.getTextElementByColor(new jqx.color({ hex: 'FF0000' })));

            this.contatoService.getBully().subscribe(list => {
                console.log("hiok")
                this.bullyListArray = list.map(item =>{
                    return {
                        ...item.payload.val()
                    }
                })
                //Get only the Reasons from firebase
                for (var i = 0; i < this.bullyListArray.length; ++i){
                    this.reasons.push(this.bullyListArray[i]['Reason']);
                }
                console.log("hiohellllo ok")
                console.log(JSON.stringify(this.convert()))
            })
    }

    convert(){
        var object = {}
        var resultReason = [];
        this.reasons.forEach(function (item){
            object['prop'] = {reason: item, rate: 30}
            resultReason.push(object['prop'])
        })
        console.log(resultReason)
        return resultReason
    }

    reasonList: any[] =
        [{"reason":"He say i stupid.","rate":42},
        {"reason":"I don't let him copy my homework.","rate":47},
        {"reason":"I score higher than him and he not happy with it.","rate":39},
        {"reason":"I am not sure actually.","rate":37},
        {"reason":"I can do more sit-ups than her.","rate":43},
        {"reason":"I saw she eating in class.","rate":50},
        {"reason":"I got a new bag and he jealous of it.","rate":35},
        {"reason":"I can shoot the ball from half court.","rate":43},
        {"reason":"I never help him do his power point slides.","rate":40},
        {"reason":"I don't allow him to cut queue.","rate":45},
        {"reason":"I can do the hard questions and he was salty.","rate":39},
        {"reason":"I saw him cheat during exam.","rate":42},
        {"reason":"I accidentally make his water bottle fall.","rate":50},
        {"reason":"I am not sure.","rate":36},
        {"reason":"He say i steal his pencil but I didn't.","rate":44},
        {"reason":"He call me a loser.","rate":55},
        {"reason":"She don't like my new pencil case.","rate":48}];

    source: any =
    {
        datatype: 'array',
        localdata: this.reasonList,
        datafields: [
            { name: 'reason' },
            { name: 'rate' }
        ]
    };

    dataAdapter = new jqx.dataAdapter(this.source);

    getTextElementByColor(color: any): any {
        let colorContainer = document.createElement('div');
        colorContainer.setAttribute('style', 'text-shadow: none; position: relative; padding-bottom: 2px; margin-top: 2px;');
        if (color == 'transparent' || color.hex == '') {
            return colorContainer.innerText = 'transparent';
        }

        colorContainer.innerText = '#' + color.hex;
        let nThreshold = 105;
        let bgDelta = (color.r * 0.299) + (color.g * 0.587) + (color.b * 0.114);
        let foreColor = (255 - bgDelta < nThreshold) ? 'Black' : 'White';

        colorContainer.style.color = foreColor;
        colorContainer.style.backgroundColor = '#' + color.hex;
        colorContainer.className += ' jqx-rc-all';
        return colorContainer;
    };

    myColorPickerOnColorChange(event: any): void {
        this.myDropDownButton1.setContent(this.getTextElementByColor(event.args.color));
        this.myTagCloud.minColor('#' + event.args.color.hex);
    };

    myColorPicker2OnColorChange(event: any): void {
        this.myDropDownButton2.setContent(this.getTextElementByColor(event.args.color));
        this.myTagCloud.maxColor('#' + event.args.color.hex);
    };
}