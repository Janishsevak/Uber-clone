import React from 'react';
import { useContext } from 'react';
import { CaptainDatacontext } from '../context/Captaincontext';

const Captaindetails = () => {

  const { captain } = useContext(CaptainDatacontext)

  if (!captain || !captain.fullname) {
    return <div>Loading...</div>; // Show a fallback UI while data is loading
  }

  return (
    <div>
      <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-5">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhIWFRUXFRUVFhcWFRUVGBcYFRUXFhUSFxcYHSggGBomGxUWITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGy0lHyUtLSstLS0tLS0tLS0tLS0tLS0rLS0tLS0tKystLS0tLS0tLSstLS0tNy0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAIDBQYHAQj/xAA/EAACAQIDBAgDBQYFBQAAAAAAAQIDEQQSIQUxQVEGEyJhcYGRoQcysUJSwdHwIzNygrLhFCRic6IVNEOS8f/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACIRAQACAgICAgMBAAAAAAAAAAABAgMRITEEEkFRIjJhE//aAAwDAQACEQMRAD8A7iAAAAAAAAAAAAAAGNxW3sPTqdVOrFT0VtXZvcnbcBkgaxtDp3gqUnDrM8lo8sW4r+a1n5XL1Pppgsqcq8Yt8NXb0RG4T6z9NhBEwe06NW3VVYTvuyyTJZKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP23tFUaTl9p6R8XuON4jaChKVSdpOWZ6vXXfr5+p0P4h11Cmsz3rRcbrW6OB7ZrVHJvWz056GN9zbTekRFdsticVneZ2SvuXFnmfT8zC7N2kofOvPLmfuzM0ZRrJ5U1xvLLfx32InheJ2sUNotTvB5XF6OLs9OTW5m+9FvidWptQxadaFtJKyqLx4S87M5hOnGErRfHfdN+xdU9bL9c39S0cdKzG+31FszaVLEU1VozUotcOHc1wfcSz5/8Ahzt+pQxdOEW3TnJRnG+jveK805XPoA0idsbV0AAlUAAAAAAAAAAAAAAAAAAAAAAAAAAHz/0z2/Oviqs5vLFJ04x4QUZLR97zamHwmElXjaKut3PwMp8Wdkuhiqlr5Ks1Vvyzaterkv5UTvh80qVnvu2c2W3rG3XhrF7aatjOh1fhB8zHUo16MrJOL46as7vhbMi7S2NCo7uC9DOuaZjl0WwRE8OLVpfadJp89/nqWoQ4tvzOrY7o/C3yo0zb+xssJOO+zsWrljelbYJiNvOgii8bh8y0danZJXd8yt5Xtc+jz5a+HlSX/UcLx/b0ufGaT+r9D6lOmsacN52AAsoAAAAAAAAAAAAAAAAAAAAAAAAAADnnxg2W50IVY708kl97SUopcnfNr3mldEUoUHWm1CGaW97km1b1OnfEHBudGEle0ZPN/MtJeq9zTcBs5PDxUktalSST3J3fDzZy5pidxLtwVmNWj5V4Tphg07Oql3tNI2ahtGnOKlFqSe5p3Rz2t0alOSdSrUa1zQUZK7u7ZWlaPDffdwNi6MbL6lOm5OSavqkrPyMvxiPxdUe0z+Tzb/S3D0Xkd5T+7BXfnyNdxW1VWj+4qJP7Wjt4pbiZiOikasnKead3qsyVtb6fQmYPo9Ggm4wcFlSy577uNty8hM11v5NX3r4aJ0Tw0qGPzxSboTdSzWjum4r0Z9LUamaKktzSfqrnFsFs5PEOUV2pZYu3FXainz+ZHa0raI6cVpttw56RWI++XoANnMAAAAAAAAAAAAAAAAAAAAAAAAAACxjsMqlOVN7pJrw5PyepodXCOlmpyTWSba74yUdz4rSWp0M1zpxQk6CqQ3wlfyejv3bvUyy0iY23w5JrMQw0sfGMddW9Eixgat53dt73fT6Gp7QhVk+tgpTSirQjJRdvtWvvdy1g9m1qzjXodbCTtucXqvszTa58Tliu3o+/8bRicYqVTSaTvonx0u/13lFfa6qRf3lvX4+Br2L2HWgp16qzTa0zySvyjGMfoWaWBlSh1lWS6xwd1FNRTlZKKu2xNdQe89t06C7M62rKs32aclaPOVm15LedCNU+HGHaw0pv/wAlSTj/AAxSgveMjazrx11V5ma3taQAGjIAAAAAAAAAAAAAAAAAAAAAAAAAAAi7UqU40akqulNQk5/w218yUax8QZuWAxEYayVOTtzyq7QTHbndSu6Na17wcmr8nxT5X0ZmKUnHt082utouyfiajGUp0lJu7cUpd9l9STszb8qXZne3M4e+YenW014lsk+sqO842tuzSu/JfmattzFOdZU48NX+H5k7G9KE1aCu+Ftf/hh8LTavOT7UtX3dxPXMlp9uIdn6DbRhWwlNRVurXVNd9Ps5vOz87mwGgdA1/hqELp9vNUmnv/aTc15q+43ujXjJXjJP9cVwO2OoebbudLgACoAAAAAAAAAAAAAAAAAAABbr080ZRva8Wr8rq1wK4yT3O56aVsLbGSUXLSMrRkuT3X8n7GxVsdK+mi9/crS3vDXNinHOmSbItXHxXy6v0RAlVb0cmUM00yV1sVOW92XJbiNVjdWaundPwej+pfS1IW0do0qS7ctXfLFayfgl9dxI5zV2ZLDSlRlqk3kl96DfZl48H3pmOxFFXNwx0auKjLrIRptSTotu2j0lSm+b3p+C4XNd2hg5x0lFxlyf61POy0mlv49TFkjJX+sZlS3InbD2d/iK8KVuyu3P+GL3ebsvC5RgNmVa0rRi3ze5Lvb3Iz+Dz4SLjSUalVyzVWk3HKlaNLM1fm783xJxUm1tz0rmvFK6jtt7p7/ReRXR58SzsrHU6sdOzJLtQlpKPiuK79xLoU9F4I9B5qTS2hOO95l37/UnUdpwavK8XyevpYxeU8cSNDYITTV07oqNcp1XG+Vtc7MnYPaq1VTSybzbtErtPvtciYGVBqGM2vOpUioScXKSjBLhd/M+fN9yZt5nW8W6a5MU49bAAXZAAAAAAAAAAAFrE11CLky6YXpHi8kbvdGMptc7J2X1A0KEHKdRPRKvNLwdR2N6nC3garg6GaOZLV6vx3m1qWaF14r6r8DDxp3t2eXv8RLQ9sexPUdTjeLeWp4aDeZxV+dtS8g0QLNTDRas0reBAey4aqXy/dks678rlqjKHm92Cd6YSOEWVUqMLK7eZ7o3er1+ZkzB7MhTVkvFve3zbMhlskghHEEzvtFqYGErNxV1ua0a8GtS9LRFZS9ZeGv5EoFHQplomXGWsR8svB+6AohHTXjq/PciHtSH7N893q9foTpVopb/AE9iBj2pWTd7au2q8DHLeIrPLbDSZvHDG9CKfWYycpbqVNuC/wBU3lcvKN1/MdCOfdH8So4+mo6KcalN+Uc6uud4HQSmCd0X8rf+nIADZzAAAAAAAAAAAGk9OsVbNG67TjHvsrSl9V6m51qsYxcpNKKV23okjkvSXaEa9eU09L9lbrJaJvve/wBDLNf1rLbBT2vDIbIxqs8zsl32MlT2zwjLhbhuMRsSdKULSS03t6+5bxez6M5Zo1JQa+41Z+KkmefFpr1L05pW3cNlwm11dRlueifLlcy9zQsJh1GrHPXcqaabWWz03Xd7W56G9RZ3+NebV5l5/k0ito1C4j0pzHrZ0OZSeU3qGyinLUC7VehS3Y8mymb4EiuO4pp8X3hyPKe4CqTMftrE9XSzPRZlmfJWe/uvYmN6kDb+JcKa5N2l4We/uM8v6S0xfvDAVNvRt2M0/wCGMpfRF+hXrSjfJa/BuzIlbbUYLWaXmWKO3KstYU5ST4paHlaetGmKxWIqUq2f5Zxmpx4q6d15aHY9kbRhiKMK1P5ZK9uKe6UX3ppryOJbVqzdR54tPR2Zm+hXSV4WfVy1ozl219xuy61d26/cvXqwX9eJcnkY/bmHXgEwdjgAAAAAAAAAABoHxR2s49VQi7Zs05+Vkl/yZz6VT9XMv8RcU54ynylTm1/LO30cTAW56M48/wCz0MHFIZzZWz41Itqs4c0txTLZclK8MQv5lf6NFjZOGUk11jj4O1y5PZcU23iX4JJ+7Od0Jmx8LKpXjSqTWV31he7aV8rT3JpPW7OiZrGqdBcLHt1HeTi7Rm1ZarVJc1z7zaKx6Hj11Xf287yLbtr6VzZVTqFuLui05WZuwSZsopspdW6PMPvAu68S2pa3K8Q7IjRkBfzFSlZEdzKZ1r6ASKLvdkPGylKNTJq1B273bcSKk8kCJKrlpSlxs37DWyJ00qhiIU21GjaS3pU25Lx0uTMHtKtJvLSkrfei4f1K5JeIrzvOEXJN301fhbeW8TLERjmlCaT/ANL9+R5dsVonp6lMtZjtq2168p1ZN3uWeORJuUrRS+821ZLlrYubVxcYPtyyyk+zFaym92WKWrdzO7D2W1JVavzq+WKd1DNvu/tStfuV+O81x4psyyZYq6n0fq5qEFe+VZP/AF0T9LGRNd6JVv3kO9SXno/ojYjtlwAAIAAAAAAIG2cYqdKWurTUfG2/yJ5pXSbGXqW5Nx8FF29yYga30g2csRCKUlCpFvq52vlb1cWuMZJa/wAKfDXVJ9Gdop/vsLKPN9Zu8Mi+pvtWFvB6P80HT0KzSszuWlclqxqGL2F0dUrRqT1ytycFlTa5Jt2VzKVujdFJqKbaT3vjldtF32JWyasVJ3dmlb1f9ivGYiNnJPtJ2t5p39mIx1j4ROW8/K7sNpU4pK1uWhkaxiNmTtdd5lc10aKKKc7MrnG5FmXIVSQ3F7CvV+BYqTFCe/UgXcZPcizc8rO7RTYkeuRcw9PW7PKdIuYmqoRCETHVc0lFeZa2tK1KS7rFODV25MtbZn2bAedHMR+ya6tvIrtrk5fmzNYlqVKfDsvf3a/gV9DcElhW+NRyT8E3FL6vzIFTFq0oJNuzUuCWlnqQMP1EZfNbTVXSeq46jBw5c3+vYsUZv5Zf2f5Ml0Z2/AaNpODxcqVTNDfZprmt7Xsbps3HRrQU4vxXJ8jQYtpSqPcrxiubfEzvRWNppLS8G2udrfixMcDawAUSAAAAABznbFdVZVZR4TuvDgzoxyx3hUknzcZeTtf1JgZHD1FKmu8s16llp/c8oyypw7/VMsVVfeWQr2dJqT43XgXsXh8sVNvWUnG275VHV8n2l7kbDu0rl3E1r6PXXR+SAvYCZmKFQwOGepk6NQkTasLkdaF6MympECiRVQ3StdvuLLafGxIwslrbgJS9cNfL9bypI8qS1PYBC5exidoVszyomYutZGNw0bu4E6hGyIG1jJp2RhdozuyUN82DSUcPSS+4pecu0/ds1jGSvUrdnLaUrrm9dX6X8zaNhP8Ay9L/AG4/QxXSiiotTS1krSfel2fOzfoUjtLVakNb2uuP5mL2/tHqY05Ravn3Pc4qLzJ+q9jLKVyzXwdOTU5QUpJWi5K9udibRMxwmsxE8mA2xTxEU8ri4/Zbv3XXNehm+i2KzYpJblTml6p/gjUav75ZfspuT3JaWUfF39jaOgVPNXnPhGn7ykreyY+OUT3w3wAFEgAAAAAaF0pweSvJ27M1n7nfSS8b3fmjfTDdKNmutSvFduHaj3r7UfZPxSJgaHSqtyaf2UkvS5IqLS5YpRtd89fYqk21yXv/AGLIlTGWvgX8erTy8owv45U37tmQ6PbFdaSlJNUou7/1v7q7uZi9oVc1apLnOT/5OwIVUXqT6MjGU2TKMiYEt1Sidd8ynqy7ToriSLMYtmRwVNqPn393IohAvwdkQPZvUplLQolLUsYqrwAi4ypmdkScNCy/WpDoxvfUnQJQqqPQwmLepmaj0MJiN7A6LsRWw9H/AG4e8UxtfA9dTcb2e+L71z7tS9gaOSnCD3xhGPpFIvmSzmVek1Jp6STaa5PinzQUtNb+WqNx210f62XWQkoytqmrp23PTca1jNmVaS7cHbmtY+qL72qwOIjdvl9eUTdPh9h2qVSo/tTSXeoLf6yZgtmbFqYmdrONNb52+nOX0OhYPCxpQjTgrRirL8338SJlMLwAKpAAAAAAAAYTaXRyFSTnF5JPV6XTfO3BlOD6MU4u9Rub5fLH03v1M6BsUStGOiSUVuWiSSOTRlxOpbVlahVfKnN/8WcrTLQL9NkmnOxDgy6pFkM1RnoXcpicPiGidDFIlCUi5TjdLXd+ZAqYjkTMM+yvAiYSVZWuYvEVLskYqdrsjYand3JQk0IklFMUegU1noY/CNdfST3dbT/rRNrPQxmHn/mKV9yq02/DOhI6eADJYAAAAAAAAAAAAAAAAAAEHbv/AG1b/bn/AEs5bIAtVC5TLx6CyCJJiAWFZkKPyx8EAQIWN/EuYXcAShJRUABar7jB1Pml4AEJdYABksAAAAAAAAAAD//Z"
              alt=""
            />
            <h4 className="text-xl font-semibold capitalize">{captain.fullname.firstname +" "+captain.fullname.lastname}</h4>
          </div>
            <div>
                  <h4 className="font-semibold text-xl">295.50</h4>
                  <p className="text-sm text-gray-600">Earned</p>
            </div>
        </div>

        <div className="flex justify-center gap-5 items-start mt-8 bg-gray-100 rounded-xl">
          <div className="text-center">
            <i className=" text-2xl ri-map-pin-time-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600"> Hours Online</p>
          </div>
          <div className="text-center">
            <i className=" text-2xl ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 "> Hours Online</p>
          </div>
          <div className="text-center">
            <i className=" text-2xl ri-booklet-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600"> Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default Captaindetails
