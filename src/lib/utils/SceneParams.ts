export class SceneParams {
    distance: String
    bgTemp: String
    flow: String

    constructor(distance: String, bgTemp: String, flow: String) {
        this.distance = distance;
        this.bgTemp = bgTemp;
        this.flow = flow;
    }

    public encodeString(): string {
        return `${this.distance}_${this.bgTemp}_${this.flow}`
    }

    public static decodeString(decodedString: string): SceneParams {
        const [distance, bgTemp, flow] = decodedString.split('_');
        return new SceneParams(distance, bgTemp, flow);
    }

    public static parseDirName(dirName: string) {
        let distance = '';
        let bgTemp = '(不明)';
        let flow = '(噴射なし)';

        const regex = /([0-9.]+)(℃|L|m|Ｌ|ｍ)/g;

        let match;
        while ((match = regex.exec(dirName)) !== null) {
            const value = parseFloat(match[1]);
            const unit = this.convertFull2Half(match[2]);

            switch (unit) {
                case '℃':
                    bgTemp = `${value}${unit}`;
                    break;
                case 'L':
                    flow = `${value}${unit}`;
                    break;
                case 'm':
                    distance = `${value}${unit}`;
                    break;
            }
        }

        return new SceneParams(distance, bgTemp, flow);
    }

    private static convertFull2Half(fullWidthUnit: string): string {
        switch (fullWidthUnit) {
            case 'Ｌ':
                return 'L';
            case 'ｍ':
                return 'm';
            default:
                return fullWidthUnit;
        }
    }
}
