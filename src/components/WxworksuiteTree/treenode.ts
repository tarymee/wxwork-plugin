import { LitElement, css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { repeat } from 'lit/directives/repeat.js'

// import icon_right from './img/icon_right.png'

const icon_right = require('./img/icon_right.png')
console.log(icon_right)

export default class WxworksuiteTreenode extends LitElement {

  static componentName: string = 'wxworksuite-treenode'
  static register () {
    if (!window.customElements.get(WxworksuiteTreenode.componentName)) {
      window.customElements.define(WxworksuiteTreenode.componentName, WxworksuiteTreenode)
    }
  }

  static styles = css`
    :host {
      display: block;
    }

    .tree-node {
      display: block;
      /* border-radius: 10px; */
      background: #fff;
    }
    .tree-node-line {
      display: flex;
      width: 100%;
      height: 54px;
      line-height: 54px;
      font-size: 16px;
      align-items: center;
      cursor: pointer;
      box-sizing: border-box;
      border-bottom: 1px solid #F6F6F6;
    }
    .tree-node-line-select {
      background-color: rgba(000, 000, 000, 0.2);
    }
    .tree-node-line:hover {
      background-color: rgba(000, 000, 000, 0.1);
    }
    // .tree-node-line:focus {
    //   background-color: rgba(000, 000, 000, 0.1);
    // }
    // .tree-node-line:active {
    //   background-color: rgba(000, 000, 000, 0.1);
    // }

    .tree-node-expand {
      flex: none;
      width: 24px;
      height: 24px;
      // background: red;
    }
    .tree-node-expand-1 {
      transition: all 0.3s;
      width: 24px;
      height: 24px;
      background-size: 10px 10px;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IArs4c6QAAAE5QTFRFAAAAmZmZnZ2dk5OTlZubmJiYmJiblpaZlZeXl5ealZial5eZlpeZlpiZlpiZl5eZlpeZlpeZlpealpialpeZlpeZlpeZlpeYl5ialpeZUWV/QAAAABl0Uk5TAAUNGik0SktlZW+CoLnP0tXY4O/x8/f7/lzrYIYAAABWSURBVBgZtcFHDoAgAEXBh9h713//i2qMQWDvDL+odwX2GlgUWYFBkRHINgW2jFtxyHPkPKpTzlnyauQ0OK1eLR/T6dEZPEmvW58QsLM0WyLpNKX86AJTcwzl85W+bAAAAABJRU5ErkJggg==);
    }
    .tree-node-expand-0 {
      transition: all 0.3s;
      width: 24px;
      height: 24px;
      background-size: 10px 10px;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IArs4c6QAAAFRQTFRFAAAAmZmZnZ2dk5OTlZubmJiYmJiblpaZlZeXl5ealZial5eZlpiYlpeZlpiZlpiZl5eZlpeZlpeZlpealpeZlpiZlpeZlpeZlpeZlpeYl5ialpeZ086ZTwAAABt0Uk5TAAUNGik0SktlZW+Cg6C5z9LV2ODh7/Hz9/v+0+Z51wAAAFNJREFUGNON0DkSgCAAQ1FUcFfcF/7972kvcSTla5KJMV9p98lFeMFZvRHgbgQSOoEwZAIZc4H4QiCrFciSiptNK1KTxPjQi0NqcV0ZnXzMzvzlAX8aDeeIcC7nAAAAAElFTkSuQmCC);
    }
    .tree-node-expand-org {
      width: 24px;
      height: 24px;
      background-size: 16px 16px;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAQtQTFRFAAAAAID/Inf/Ioj/G4b/F4D/H3r/H4X/HYD/HHv/HIT/G4D/Gn//GYT/GID/F3z/FoP/HXz/HIP/G4D/GoP/GYP/GIL/HID/G4L/GYL/HIL/G4T/G4H/G4X/GoP/GYH/GYP/GoT/GoP/GYT/GoL/GoL/GYX/GYP/GoT/GoP/GYT/GoT/GoT/GoP/GoX/GoX/GoT/GYT/GoT/GYT/GoX/GoX/GYX/GoX/GYX/GYX/GoX/GoX/GoX/GoX/GYX/GYT/GYX/GoX/GoX/GYX/GYX/GoX/GoT/GoX/GYb/GoX/GoX/GoX/GYT/GYX/GoX/GYT/GoX/GoX/GoX/GoX/GoX/GYX/GoX/GoX/GoX/qs3FVQAAAFh0Uk5TAAQPDxMWGRkaGxscHh8gISMjJSYnKSsuLzM3OEFDRkdITU5TWFpcZWxtcHh+iIibnKKmrK60uLq+wMHGx8/T1NXX293e4eLj6evs7vHx8fP19vf4+fz9/ho458UAAAE2SURBVEjH7ZbXVoNAEIYXEmCjsRFRwJ7Ye+911RhLFIwG3v9JpIUzuBJ3LvQq3+U/++2ew3DODCEBkqyo9BdURZZIQkGjQmiF+HyRClOM7qcIgjckDSNoEpEpCpkoOEEhKk5QCRf17Th+wvv+IFfmhSUfsCYgbEBhS0DYhMJ2T/gLQaQPK1BYFxDKh17nePt4RECgtGKa5t2tYRjDPxRJzm/MWE7huzC7e3Ia4rjnIWd7k92F6sfna4Z2a6qrcPQ2kQ2mvYM8oTQWwK4syxroREO2bbcudV2v9PPCwlP68d3VOFp20+h5kRPqoF1OOXqyCaIHToD99c0wGc1EPeF/BA9WxznB44QbUH0sRVEDRIwTZi5emgnXtTiav0/vZ3OpgB4o6JGFHorosYse7PjVAb+c4NafL0Vh7eZJslu0AAAAAElFTkSuQmCC);
    }
    .tree-node-name {
      flex: 1;
      color: #666;
      word-break: keep-all;
    }
    .tree-node-check {
      flex: none;
      width: 18px;
      height: 18px;
      margin: 0 12px;
      background-size: cover;
    }
    .tree-node-check-1 {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAAXNSR0IArs4c6QAAAP9QTFRFAAAAAFX/IID/GIb/F4P/F4f/Gof/GoX/G4T/G4f/GYb/Gob/GoX/G4b/GoX/GoX/GoX/Gob/GoX/Gob/GoX/G4X/HIb/Hof/H4j/MJH/NJP/OJX/O5b/PJf/QJn/QZn/Rpz/SZ7/S5//UKL/UqL/VqX/XKj/Y6v/ZKz/Z63/aq//crP/dLX/erj/fLn/f7r/hL3/hr7/i8H/k8X/mMj/m8n/os3/pc7/qtH/rtP/rtT/sNX/t9j/x+H/2Or/3u3/4u//5vH/6PP/6vP/6/T/7fX/7vb/8Pf/8ff/8vj/8/j/9fn/9/r/9/v/+fz/+vz/+/3//P3//f7//v7/////i2rNLwAAABR0Uk5TAAMIFSEiRFhoaJikxMrN1+v4/v5B0+PEAAABVUlEQVQ4y42U53aDMAyFDSFhb7Xp3k1305XuvdOZtHr/Z6lNgWMT4Pj+4Ro+PCRLhHDSDNsLwjDwbEMjpVJ0J4JckaMro0zLh4L8VgFRrRhGFFsqzzRcKJXb4BgfKuTnlOpCpdxsRQtqZKXniuugODmj4kOtfBYvverrxHm/y546hZwKpn2J2GfGIaQZlTPjF4h4lWRII2Y5M3ZKmZvJxBvELoeOKXM79e9t4qVvZ3odjulR5m46HXgkSN01Djdy5pAyD7PZKCBh6h4Rv7O5DijzNJ//EubQ+hDxYyWxe5R5WQAOypaDrV/Et0VqdplZ4jYY5BsH6NIJnudgmzLvy/xJPT4EbCv3+z+In6tCOGwhmEeY6KsjxswQ03LCmMGayNC0CAlmCRtsFoLvFK9K++x1p5ghXfbSSV1fuUKQKymp4pQrc7mGIdd6JJsYU9PM2qEptMM/OntmUPz7cm0AAAAASUVORK5CYII=);
    }
    .tree-node-check-0 {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAAXNSR0IArs4c6QAAAE5QTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxKKmWQAAABp0Uk5TAAECAwUHCAkLDhETGBkaGxwfICEiIyQmKCm9h7L5AAAA20lEQVQ4y42U17KDMAxE14QSSmi2wef/f/Q+pAyTC472UXPGsspKOqjsRr+ntPuxK3WudgHSFsKWgKU9Qe4B1r52kuTqfoVw/0LcAFN1jFQTDO4YuXli8/12E/G3AxOZi/8/KGbih3Kex3ktD/w748B8UbBmhlddxOIKKiLPGgONLtUQJKllUkYTraSFKgdVLFLJqqxWSnX0eain00idh2pG+eTykEte+6Yf2nal8AsKyQaZ0pk+bmqBqZmmsZgGbFsV09LZ1tdkBJulTOa02dx2MGynx3jEcufwDz3UEok9W1hJAAAAAElFTkSuQmCC);
    }
    .tree-node-check-2 {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAAXNSR0IArs4c6QAAASxQTFRFAAAAAFX/IID/GIb/F4P/F4f/Gof/GoX/G4T/G4f/GYb/Gob/GoX/G4b/GoX/GoX/GoX/Gob/GoX/Gob/FnTfFnTgFnThFnXhFnXiFnXjFnbjFnbkFnflFnfmFnjnFnjoFnjpFnnpFnnqF3fmF3joF3npF3nqF3nrF3rrF3rsF3rtF3vtF3vuF3vvF3zvF3zwF33xF33yF370GHvsGHvtGHvuGHzuGHzvGHzwGH3wGH7yGH7zGH70GH71GH/2GID3GID4GIL7GIL8GIP9GYH4GYH5GYL7GYP8GYP9GYT+GoX/N4nnN4vqOIzuOI7wTZfqTprxU5npVJvuVJzuVJ/0osfyosn1o8v5xdz4xd35xd77xd782ur82+r72+v97/X97/b97/b+8/j+////kkh67gAAABR0Uk5TAAMIFSEiRFhoaJikxMrN1+v4/v5B0+PEAAACMElEQVQ4y43UaVeyQBgGYFxyF1zCiCiIyiAxKkpNC1pkGdo322wR//9/eGEGfJHsnO4vnAPXmRlm5nkwLJRkJo+XyuUSns8ksZmJpQsVe5JKIR37aVKEHQmRipB4rmr/SDUXD5tE0Z6ZYiJkCPuXEBMVL9q/phjMmAveAOtkb1eWd/dOLBC8y/n/VQ2IJkuiwPOCKMlawKrwH2P+gsDZjsg9DIaOMxw8cOLOma8Ib7/SgWnyl69jP6+XfDNQaRcVkDmXuZvv8STfN5x8jlQBw+YqaD3H3MXXOJSvC+4YrauSxLJooNPNxZfxVF4WN0/RUBksjwY6Yu7GkdwxR2ioPIZDZG4tPEXR08KWCRGOlSAy2PmPKPqYZw2ISljZe1g6TTpR5JC0bnlfyz7qU7MQ1fcRnM7S6NowioY1WrPQdDhCTG0QRYMagxCOtsDq18n7KLon62i6PNpMS98mmbdp88aQ22jhGXQswOitUVejsBldUWs9uAXuscADBqYqUcu3ITW6XaYkFW5mwb8qwNK7As1evwfm/Zqlha4OjyUdXDpgah1hiW08Pn86zufzY4NdEjoaHAheOnh9gWWobXF9hW9IzabU4FfWxbZqeANVU/8LwVMdRayvbrDsxmpdVDrIBIWASspVWrelKPsHB/uK0upqyExKChUnsExd7R22W632YU/VTWiIRKTMgcsMva9pfd1wCYiUedAwgOtgACSRhvG31vPHJuZlLhu0w+xUO/wHsg0VS5qPp80AAAAASUVORK5CYII=);
    }



    .tree-node-children {
      padding-left: 20px;
    }
    .tree-node-name-noicon {
      padding-left: 20px;
    }

  `

  @property({ type: Object })
  node: any = {}

  // 判断是否开启企微通信录支持，默认不开启
  @property({ type: Boolean })
  iswwopendata: boolean = false

  // 控制通信录转移类型
  @property({ type: String })
  wwopendatatype: string = '' // userName | departmentName

  @property({ type: Boolean })
  updatepoint: boolean = false

  @property({ type: Boolean })
  ismulselect: boolean = false

  @property({ type: String })
  expandicon: string = 'normal' // normal | organization

  constructor () {
    super()
  }

  connectedCallback () {
    super.connectedCallback()
  }

  private toggle (type: 'expand' | 'select' | 'check') {
    console.log(type)
    this.dispatchEvent(new CustomEvent('toggle', {
      bubbles: true,
      composed: true,
      detail: {
        type: type,
        node: this.node
      }
    }))
  }

  private clickNode () {
    if (this.ismulselect) {
      this.toggle('check')
    } else {
      this.toggle('select')
    }
  }

  handleToggle (e: any) {
    this.dispatchEvent(new CustomEvent('toggle', {
      bubbles: true,
      composed: true,
      detail: e.detail
    }))
  }

  private test () {
    console.log(this)
  }

  // children isselected: ${this.node.isselected}<br />
  // children ischecked: ${this.node.ischecked}<br />
  // children checkstate: ${this.node.checkstate}<br />
  // children ismulselect: ${this.ismulselect}
  render () {
    return html`
      <div class="tree-node">
        <div class="tree-node-line" tabindex="-1" class=${classMap({
          'tree-node-line': true,
          'tree-node-line-select': this.node.isselected
        })}>

          <div class="tree-node-expand">
            ${
              this.node?.children?.length
              ?
              html`
                <div
                  @click="${(e: Event) => this.expandicon !== 'organization' && this.toggle('expand')}"
                  class=${classMap({
                    'tree-node-expand-1': (this.expandicon !== 'organization' && this.node.isexpand),
                    'tree-node-expand-0': (this.expandicon !== 'organization' && !this.node.isexpand),
                    'tree-node-expand-org': this.expandicon === 'organization'
                  })}
                >
                </div>
              `
              :
              ''
            }
          </div>




          <div
            @click="${this.clickNode}"
            class=${classMap({
              'tree-node-name': true
            })}
          >
            <!-- ${this.node.name} -->
            ${
              ((this.iswwopendata && this.wwopendatatype) || (this.node.iswwopendata && this.node.wwopendatatype))
              ?
              html`
                <wxworksuite-opendata
                  type="${(this.iswwopendata && this.wwopendatatype) ? this.wwopendatatype : this.node.wwopendatatype}"
                  openid="${this.node.name}"
                >
                </wxworksuite-opendata>
              `
              :
              html`${this.node.name}`
            }
          </div>


          ${
            this.ismulselect
            ?
            html`
              <div
                @click="${(e: Event) => this.toggle('check')}"
                class=${classMap({
                  'tree-node-check': true,
                  'tree-node-check-0': this.node.checkstate === '0',
                  'tree-node-check-1': this.node.checkstate === '1',
                  'tree-node-check-2': this.node.checkstate === '2'
                })}
              >
              </div>
            `
            :
            ''
          }

          ${
            this.expandicon === 'organization'
            ?
            html`
              <div class="tree-node-expand" style="margin-right: 12px;">
                ${
                  this.node?.children?.length
                  ?
                  html`
                    <div
                      @click="${(e: Event) => this.toggle('expand')}"
                      class=${classMap({
                        'tree-node-expand-1': this.node.isexpand,
                        'tree-node-expand-0': !this.node.isexpand
                      })}
                    >
                    </div>
                  `
                  :
                  ''
                }
              </div>
            `
            :
            ''
          }

        </div>

        <div
          class="tree-node-children"
          style=${styleMap({
            display: !this.node.isexpand ? 'none' : 'block',
          })}
        >
          ${
            this.node?.children?.length
            ?
            html`
              ${repeat(this.node.children, (item: any) => item.id, (item, index) => html`
                <wxworksuite-treenode
                  expandicon="${this.expandicon}"
                  .node="${item}"
                  .iswwopendata="${this.iswwopendata}"
                  wwopendatatype="${this.wwopendatatype}"
                  .ismulselect="${this.ismulselect}"
                  .updatepoint="${this.updatepoint}"
                >
                </wxworksuite-treenode>
              `)}
              <!--
              ${
                this.node?.children?.length
                ?
                html`
                  ${this.node.children.map((item: any) => {
                    return html`
                      <wxworksuite-treenode
                        .node="${item}"
                        .ismulselect="${this.ismulselect}"
                        .updatepoint="${this.updatepoint}"
                        @toggle="${this.handleToggle}"
                      >
                      </wxworksuite-treenode>
                    `
                  })}
                `
                :
                ''
              }
              -->
            `
            :
            ''
          }
        </div>
      </div>
    `
  }
}

