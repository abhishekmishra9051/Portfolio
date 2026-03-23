import { useState, useEffect, useRef } from "react";

const PHOTO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAAAAAAAAQAAAAAAAAAB/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgB9AH0AwEiAAIRAQMRAf/EABwAAAIDAQEBAQAAAAAAAAAAAAIDAAEEBQYHCP/EAD8QAAICAQMDAgQDBwMCBgEFAAABAhEDBBIhBTFBBlETImFxBzKBFCNCUpGhsRUzwSRiCEOC0eHxNBZTcrLw/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAECAwQFBgf/xAAtEQACAgEEAQMEAgICAwAAAAAAAQIRAwQSITFBBRMiMlFhcRQzgZEjwQah4f/aAAwDAQACEQMRAD8A4C7EQaREvodM1gpEoPYTaAAUWGlRaj7jiRFlpB7URLkkAJe1hF0AFeSFpESAKKIEkXQAAkXQVEoYA0Sgki6GFAUSg6KoBA0UkHtJtAACB7SJAABA6KrgYAkCpkoQAkC2kpgAFEoOiUAAUQPaTaACych0SgAXRKD2k2gAvayUw6JVIQCyDAdqAAO6BaobtK2/YQCwRrRW0AFEDr7lUACyB0VtAAO6YIygWheBgkZe0lEQF/QrwMogAKKGOP1KqgAVRQ19gdr9wGKZQxxKcQGLogTiQAO2Sg0ibQAGiUHREhpABRe0JKyJe5JKhA0XQSi33L2AAFFpWHRe0AF7WWo+4xRJt4sYhe1FqIxRIlwFABRKGbS6ChC1H2JtD2k2jACikhm0lAAuiUMUSbUMBdFbRtEChbhW0m0bRKCg3CtrJtGUXQDsVtJtG0vqVtALF7SUM2E2/UQC6Kobt+pNoBYraShlFbQAXRW0btKoAF0VQzaSgAXtBobRTiqEAvaVQxR+pHGgAVX0JVh7SqEAvayNUMoqgAVtRW3kZV9yOIAKoqhtUvANMTGhVWTaMoqhDF0VQyimuBALoGvca0VTABVexVDaKAaFUwXFDmrAaABTRBlEAOTs0XtCUbLUWAAUXXAzaVt5JIGBtLoPbXYsZEWlZe0Oi0gAHaiJUwtpaiNADVkoNKgtoxC1Hgm0ZtJQAL2l0HRdIAF0ShlEcaXAALolDElRGhiYuiqGUShiF7SUhm3wTaAhdEoPaHjxTyS2Y4uUqbpd+BNpK2NK3QnaXt+Vy/hXd+EB1HUaXT9E/a46lR1SyOLwyVuvH6nnp+qtZLpmXQY8ONQytOc33dPgyy1ca+HJcsDX1cHezZsWLFDLJtwnLbFpWmzn5usQjmeKGCcmnVtpI809XnntjKcvldpe32H4tSm3LK25/TyUvUZCSxxO7i6jkllTyVGHekdXF1jpuPp+TFLR780nxlcuY/Y8nl1O65LiKMM88nOo3S9mUSc58tss+K6R6aPUZLI03GS+x0MGSOTDHKk4xk6V+54/FlkpRd9mb9Lr4wx7Zbny+H2LI58kPyQ2RZ6UqjDp9bD4UVurk1LVad5Xj+IlT4b8mnDqo5OHwyuWNx5D2k2jOH2aZW00kBdE2jNpW0AF0VtG7QdoALopxG0VtABW0raxlEaEApxoqhtAtWIBVEqg6KoB0BVAtDaKr7AAvbSB28DdpVEWMVRVDgXH2EApoqhjiVtAYqiqGtAtAMXRVDKBaABe1EDogCO1RaQxRtE2gAvaWkMSIlY0xAbSJB7S6JCBUfciig0iJe4CoGi6CSL2jACi6DSIl7DACi6DoiQABRNoaRe0AFpEoZtKokJsCiUHRKAVi6JQyiUAhaiShlEUJSTUatK79l7kZSUVbHGLk6QjLNY4uTTk/ZI5efrmXDqPhYoPTThxOb7/AGX0Ln13FjzT00Ib0pU5S9zk9U009TKWdS4f17nOy5Xl4fCOnj06xq1yzH1ecZ5nPep73ubXhnOhkVuK4SYeZuEtsv4eEIbSnf1IKNIrly+TQmXGac77iou+/BPZ2iRGjVTaav8A+QFBRV20wrcYryDcvmd9v7iEXGL2uiQdLlg42tzsuDdeUIiOWWUVSar6hwz5FK7ar2MeaUlHgHTZHKNSlbXkVCs9Bp9XN4/kk4y/7exq0mvzzk4ylFpe5wsE32uv1GLM4zpPv7CTmuEyXDPW48sJy2qV80pLs2NcafY4HRupZdNqIyj2i+D0Ogyx12uglOvieETjrZY+Jqw9pS6AlFrhqmDR2Ou6dafLtuPzUo15rucvabcGaOaO5FM4ODoWl7oqg9pdFxAVRVUN28WDtEAG2waG7eCqEFCWmVtHbUDtYDE7WSuRtcFbQ8DFbSqGtcAkRi6KoZRW0QC2kVtYygaAYugaGtWU48AIVQNDa9gWgAXRA6IA7O5RKDougEBRNoaRe0aEAkRIOi6JABRaQdESGhA7SJcDFH3IkMAKJtD2l0AgKJXAdF7QABRJtDSJQABsJtGUVtGRYui9oe0qhiAolB0R0k2+y8gAuTjGMnOcYJRbt9uEeH6h1zU588tmSeOF01F8M9HkzZNdo9dlxbZRhShF8cX3Z5iWklkhPN8KVR78cHMlmeWbXhHUw6dwha7F4YwyVPd35XPJ1NHKFvFJpezfZnKjjmkpJ/Y26H5ovfJX4b7kX0XQdCuv6ZbPjwj83ng5GNbvllxXJ6LVNfskseS/mXDOLLBKDadNgnwVZlzaEba4l+hFSX69xji6VrswXC03SVMLKDThim0mr57GjVaaMMCnt2qT4oTgai4PzwzRq9Rv+SPKXLtEebGqSMeKCTafkVxHJJJ0r/oHLJ3q19BTW5tt0iRWHLbOD7tmeUZKXd15HRdNq/BWVpQbkqtARkM0z3RtS+ZD+Urf/wAmTRy2OSk1z4NSld9v1EwUlRcXtSfP9TrdB6hmwa/BUklvSVrscr5djv8AMjd6dh8XqmNuKai3Jlc0trsshLng+lYsOHq3T9VrMs7+BLZKu6dWeX0+rxTlKF1JPz7HS6BqZaH/AFCMU2tTBQftfucqela6k2ox2ukl9WZsGZ4W6LJx3Lk3Un2KaEvI8Osy6aX8EqTNMaas7WHPHIjJKDiAkVV8DKKouIUL213BaG0U0IYqimhriVtBgKpfUFRHbV5/sC40RsaYrbZVDa4KEMVQO0a4guNAAtoGhtA0AC6KoY0U1wACmrKcRlA0AxTjZBlEIgdzaXQwhIQG0iiw6LolEiAo+5e1BJFpDABJIKgqJXAwBolBpF7RjASLrgNIm0BAbSbQ9paQCF0XQdEoaACitoe0uhkWL2koNIlAIXRi69k+D0zK72yapfWzp6nJi0ujxya35szltX8sF3Z5brGrnr2nL8kI0r8mDPqeXCJ0NLpbqcien8yWPVaVR3fGxq+PbyP0GWeyGjnjxrGuKfn7nH0OWWDVY545VKNp39TsaHBg1WlyzeSUc8HcY3Vr3M+FbZnVx8Pk4XWtNLT6ycYyUorlV2Oet21JNo6nVJ3klFpWlX9DluLi17sm3yZc6+XBoWqcsSxz+auxmySf5k+PPAvIm8Vwau+4r4j2uLbS8kTNKTZU8nm6EZdTS8V7FZW0/fkzZHud1z7IaVlbOjp8ylp1LzVP6E+Ly7u/czaVqOOUOaf9i+Yt0lt7CIdDXktNeSoPhvz7sWub54YUI7YtPt7gC5GqLlz5XkXqctY9rr6Nhxm4wdIz5LknJrkaIyQEJtRpPyuWaMOSVO5ct+TLGLv2Q7EpKTk+y5G6KkzdhUnF7nfJ1ugaiODJK1Tl2Zxcc5ZFSVJM1adS3JLl+y7lclaLYvaz3Gge5S+a7NuPSvJnxrde6aZyemZHi0ygrcq5Z6LRZsEHhTe6Tgml7P2ZzJ8GtMwdS6dkxayeqywvFkyXBLxTNGLAs+pyTj/tJ26XJ0ep6lT08sUYXOMefZNiejr4ePJG1KTj831IxyyjUkFJnLruVQ/JFKcq9wNvFnqIu1ZgYqiqGuNFNDAXQNcDaKoiwFUVQ2uAWhALpA0NoquKAEKoGh21AtUAxTVguPdjWiqEAmgWhzQNDHQmuLKoa0C0KwoXRA9pAA7tF0FRdDADaSg9pdEokQEi9oaREhgCkWkEkXQ0AKREg9paQIAKL2h0RIYgEiJBpEoBAUSg0iUMAKJtDolDIAbSlt3qMpVxf6DsWNynVOVctL2MnWM+XLeWUIwUfljBeEjFqtT7fwj2zXpNP7rt9B9Q00ln0+aOTHOLj9+H4PO6nTxlqJYlUNz4O30qUpaGCzNRSk3HnmhmbR6bUY5Sx05PlS8nOxRtnajGuDxmtjptI3826Rk0/VHizqUsTlBPlLiztazp+KWRvKvmRyddpcWKMowg7LlNIUoy8HK1nUVLJJwg4q33dmb9tdfl/Q24emTzze2Nc8JcnQ0vpbNOaUoy3Pjki8sV2ZfayZPB59ZZSdwcmWvi5Kahf2Pomg9E4pKDl8v6Ha0/pDp+GLuCnL68FD1USxaJ+WfIfgZ3F3ikq+gh4MnCUJpv6H2fJ6f01SSw40vsYcvpvTutuNVfNEP50V4H/B/J8px6eab+WXA6WDIsduLo+mx9L6fdFpcoXrfTeNxuML9xfzYsh/Af3PmUY0+X90MjC+749z1Or9OyxTdw+xl/0TI23W36F8dRFmd6WcThbeGq+31E5IOmjvrpWRPbJNe1Avo2fJzHt7kveiQenm/B51J0+ObvkZj8dmjq6npGaN1jb+xgzaXJhlVP9SammZ5YXB8gwdT+V8fVmzQp1uldeyMWPDLs0bMPyKkn9wbEkeg0Oo3Qq+I+LOlo9dOOaMt1yi13PNYH8NOpNNvk2aKWR5LttsyzgXRl4Pb5NbhhoMik082V2/dF9BzJ5syWP5tlbn2RxMM1sdvc2dbpeb9nwyk4uW9pP3RlcPCLU6Dzr97L7i6GyuUm35Bo9PjTUVZifYsrbwM2lUSEkL2g0NoqqIsFYqiqG7UU4iGJrgqhtA0AC6KGUVQh0KaQLiNooAoTQNDtoLjQWMU1YLiNcQaEIU0QY1ZAsLO7RKDoiRIAdpEg9pdDQgEi0g9pdEhAbS6CrkLaAAKJe0JIvaMANpdBUXQxAJEoZtJtAQuiUHRKGAumXQdEoZBmzoqgsuRzdR2ctd6OF1PT5MzyxjUkpOUX9Du9JdZsiVcwfc4ss8nrZ4k0kvHk4WrT/lP9I7Hp9bDnafPDDp82DUb4Tr5aj2YjS6lYr2zfb3C6m1KTTu6OXGOxXfFiSo6cYnXaeTTSlJbpPlujmajTrPnhFXz3NDzzhpId4727rz9Dq+n+k6nVOGbJicVJ8X3CTpWWwx7iujdJjuio4ker0PSVFW48/Y6XTun4tPCtlNdjZGKSXFMyyhfZdsS4OesKhFxUdpUcC7vhm+ST5pOgXFUzPPgVGKenjLivsxbwR29qN+37cC5Rtv6oyybEYVih7c2LyYYte9GyUa59uwEkn3v9CAUjj59IpfmSd+5ytX0ym5wX3+p6iUIvwIlhj2pck1NoTjFnkZ6FPiuC8WljCLSi1R6HNp4W2oq/oZp6dN/b6FqyMq9pHn9VolJce3J5nr2j+A1NStt8nvNXhexqKZ5n1Fp3PTt89/1NGHJyZ8+DdFo8i/PPcJSlFpd/PYW098o82huOMox+buzoI423k0YW+77/AHNem1MoS5lx9jCm0uO/3H4sGfLBzh4aVX3+wSquRJM7uh1EHd2zu6BSlcv4DzfQ9FnzahRm3G3yeyxYo4sahHsiek06nPc+kOcuAdpVDaKo6jKBdA0NoqhAKaK2jdoO3gB0LoGhtFUACqKr7jGiqEMU40U0NorahCFUDQ1x4BoYxVFUNoFoQCnHgpx4GUVQAJcSDdqIFis7iRNoyiUSACibRm0lDQgFEvaHtLSJCASLSoPaWkAAbS6DSLoAASJtD2l0NCF7SbRlESGIXtJQe0m0aACibQ9pNoxUHons1MXdJ8P9Ti9WjDSdUyOcJRkk7TOvtFdcg+o4081ynCFbl3aXuczXYvksq/R0PT8m2TieQnqFqMrko0u5q0mnx5pxhKO7n7B/ssXxF0k74N/SsDeeO6Plf5MvfR3Yc9Hf6L0HBlcMmSN7HaT7I9Xp9LixxqOOKXgrpuGUMMeEuDdt4pEVEusyvHFPtwBJKuEaJr37GbPOGONya5IPokuRbSTAkvoLx5ZZZvhqIblwYptA0LlH2FNduRkp+Bbd9k7Mc6sjQvjd5uwJNc+/2Dal3YnJGTbd8kVwCQMmqsRmktoTtKl2EyXn2GkOgWlX/sLcL5Xe6GRtug4Qrlqn7EiL4MWbC5cM4vVNL+5mqVP6HpckLl9PsYNbiUsbTpkoypkfB8s1uNYtVLcv1MueTcvCXg7HqjB8LUt35/RHCyZXzw2ztYncUzg51WRoPG5STVXyu56b03o5zx5G1u+Gr470eUw5Xf6nsvR/UYvUx0Sh/uQqUr789hyg5UipOj0HTtKoTeXbSa4ZuoYopJJdlwSjp4oLFHaihvc7FNFUN2lUWWAqimhtFV9xAKoqhu0GgAXQNDaKoQCqK2jKKaABVFNDGitoALoFqxjXkpoQUKcQaG0U0AUJ2lUNoFoYCqIHRAHR3qL2h0WlQyLFpFpBpF7QEAkXtDSL2kkxAJF7Q9pFEYApF0HtJtAAKJQdEoBMCiUHRKJIQFFbRlEoAF7S6DolAACQjW7lhbhJxfazVQvPh+NFY1fL8fqU6hXikXad1licTT4pO1VL+56T0t0t59V8dxe2Pb2MMdFOU8ekgn8XNNRi0rqz6foeiYuk9Nx4IR+arm33bObDo9LHJGFX5MmOHHHCX0GqKSCcNrZn1Oox4IOWSSil7kn8VyWp30VlivsZsuCOSty7djnZfUGleVwhJN+9j8HUYZlapfd9zLKSZLlDv2fnikBPA0uOTRDLF+3ITmmnaM0o2Lcc2eLjsCsb/obprkU40+KoxzjyR3GOcEm0xc8a5d0asiSYmTV13KtoWYpYuRc8aXHAWq1eLFJqcqrv7I5Go63pcbf72LV8USjBsblR0Y40k1x3DS+p5/L6k0eNNxyxl9LM8/VuGL3JJwXs+WS9qb8EXJfc9LJXaM+fE6bs5ug9VdN1U1Bzljm/E0dZZMeeG7HJSX0IuMo9ojZ4D1t0+c28sY+fCPF5se3d3f3PtGu0kM+FwlFOz5p1/o8tL1GWNxdS5j7HS0mdSW1nP1WHd80eaVp7qpdkeq/DvFPJ1d5GrhGPd+5w8+gzQi5Rjark9J+G0K6jOStfI00zfjackc5o940VQyiUdIpFNEoZXBVAAvaDQ3aU0IBVFUNaBoAF0DQ2gaABe0Ghu0GgChdAtDaBoB0KaBodQLQAKooZQNCAXtAa4G0VV9wAVRAmiAB6BItIPaShoiCkWkFtCSGIDaWl+gaRNoAAolpBpF7QEBtJQaRdEkwF0ShlEoYmLolBpF0NCF0TaMoqhgBRKGURIAAouG1TTkrS7oLaTZu+VOm+xVl5g/0WYeJr9nT9BYXrPVfT8TduU5SlfslZ9L67GpuPseB/CrHXrrSSfZY8kV96Po3XcdznOr58HNxvk6madaiMfweD9RdTWg085RcVk/hvm2fO+q63W9RnL4uqdt/kjwj6Nr+nYdXmlPLjblu8+TDrel6SePZPBH5fy1xRseHdGzuY5RjE+XZI58SbxqVr2McOudR014/iSUbupH0HUdN0+O1FO348nN1eg0MpNZMMHKvKMEoKAPk4fS/V+vxzazOLj4PTdG9VS1WRQyxUVXDPN6npOh+L8qcF529h2m0UMbvHLcv6UUySfSI+3Z7jD1OGSVNqvBplqIVzJHmemYMzmqT+jo68sOVRtrhGTJhmua4KpY2gtXq8UYS/eJs4Wr6zHDJSUv1TGdTVxmlfN2eN6k2puHanwmzPBKTojtoy+puuZ8mWWLHOUYyf5jy2bV6mdp5Z8/Xuehnp8eWXzrca9PodIoc4ot97N0JRgqoz5Iufk8fh0+bNK3ByfudfQdPz7NjUmvdno8cNNDtCEW/JqwLB2TSXtYSz/gjDConE03SMkqqKVeX5PSensOfSuayZXPd49h+ljiklbTRrhh4+WTVfQyZMjkqZoi64OngxLIu/HFnN9cdCzYMej1EsH7uckozrjl0dfQxtd+a9j3nqHQR6v+GTlDC5ZtNDcq73B3/wQwRttoy58uxpPpn5y67oJ6HXrF8W1kx7/ty0dr0Tpoxy5sygl8iTl5d//Rn69g39Tby247YqDvvz2R6vp+kx6TTrHjVXzL7nY0a3TX4Ofm4Q2iqG0VtOrZlFUVt4G0VtCwF0DXA2iqAKFbeCqG7SqAKE0VtG0U48AMTRVDWiqEAmgWhzQLQWOhVAtDWgaCwFNA0NaBoQhTQLQ1oFoAFkCogAehotIOiJEiIKRaQVFpAIFIvaGkRIABom0Oi6GAFEoOiUAgKJQVEqiSYgaJQSRK5GIGiUHRKAAKJQdEoLBAURNR+ZukuWw6BzVHBknL8iXL8IrnL4uyyCbkkj0f4WQUvWmKUGnjhiyyi+/g+hdfy7MaS8ts8X+Es8ef1BKWFxeLDo5U0u7bSPSddzbs+27pHM03ykdGcXPVc+Ejz+uyfDUptnjur9cyLNLHhhKcrq0ek9Q5tuGMFblJ/2PHyx5MU3PT6dZs/8F8K/dnX2pvbZ6PTQW22NzYtZ+zPUaiaxquW3XB5bqvWuk6dSU+q6ZS9lkTbPR+kOmdK6z6g2evOqylGMpbNBbhi+jtd/seB/8RWWGn/EGGp0XTtFh0r0uOGneLGtuSMH3a7X4KtTpk42iGpy+1LYlbq78f4+4jVdaxZHem1kcifNRdmzpXV8+/bJ/L4Xk8h6Tw6HrHr1aqWhei6blnPJLDJtxxRrhX9z1mt6bpNN17E+lZ5ZsEsqU4p2oxvk5M4KPCM+DNKb5R9E9HayWonCE8UlHy32PTdRWHHh8JtcI4nRFDHOGHF/t3uuuTd1We5e9exfnkoadp9myULPPdTaW9tUqbPBayc82eUkl80u57jrLqMot8OJ4ieKeLVtNtw7/wBzh4O7KcmO0Zc2RYVeSoV3sv8A1D4ME1os2ocl8qiuJeFyMwaPS5+tRz9WU56F3UIfzVxwafxHiusdM0X+lfF0k9LBxcI3FST7dvY244xk+TDkUouoo4+f1JFaxaXL0fNizTUVHG38z3Lj+ptzamGPbDV6bPo5z7KcWr+zPIT6Z6m6j1jBqeozbyYsWPD8R0tmOCqKVfQ+nde1eDqvTsHT8WDdiwxilkmubXsSz48cK2shheV/UjkaPUThJbMrcV9T0vRtW8lxlJt0eY0XTP2e1HJKS9judHw5Y6i2mkl7GSaVGvZwet0T43JVR9Q9FVrvS+t0XfdimvtuTPl+kVR/yfR/wq1K/aMuF04zhwyOlfzo5XqEX7Tf2PknqDpTeXS55YoRx4nHZjTSpX2+5qoP17q4dP8AV+fpslKccU3Kf0ttql/Qx6bWvLP58LxQf5ZOS/uvB1NDKOO1J8sz5Mc5xTS47NNFUM2krg6tmUXtKoZtKoLAXRW0bQNewWAqiqGuPBTXAWOhVFbRtA0FhQqgaHUDQhiWiqG0C1QAJoFoc0A0ACqBoa0C0ACWgWuBrQLQERTRA6IAHo6L2hUXtAiDRe0Ki6HYA0WkEol0FiAr7lpBUXtGAFE2h0VQIQFEoOiUMQFF1YVFpDToQFESD2k2+wWOgKJQdF0KxgUjtazNpNFl0PRM+jg8WfCsmfM/zRyNJpNe3NHO0WH4usw4v5ppf3HdUlHXeq80ou1PIo/RKzDrMm2onW9IwqeSUn4R6f8ADXpf+meouoTxcYXpaS8W5f8AwbOrSb1UmzpelMeOb6jlxt0lDHX2TZzOpQ/6if3FjjGMntLozU9VKT/BwdfjWRuUkuODlfsijm3x8Hc1OJ96MmTG6dKiEsjjKzrwlxwc3qek0Wpwv42nxyklxKubPF9W6XinKCliUtv5d3O37We41GOck0cvUaP4j5jZHLqHNUXwbqjxC6W/iNQxrniTSO90XoccMoNYra8s7el6e3NVjpeeDs6LRrEk+7K8UfLEqXInRaT4EPiOm2qSA1u6MbceGdRwVcsx6tJQdleqbcXYtx5bqq3Oq4PP6/S8qSVpd0z1PVIxuS8JHFk48pxvxycmLcQXKORHT/wuN+1+AHiyc7X29zrfDTX5afuHHTLvtsvWUreNHCeHNKXzQs26PRZ5tcbTrYdMnKn2N+m0vZLsJ5bI7Ejn6bpvZuNv7HY02ijCKbijZpsMY8NdhzjFLgpk2yqUvBmUIxXHCO/+H+ulpvUukwxfy5p7KOHNW2qNnpW16o6fT/8APj8yFhltmjLqIqWKSf2D/GLomHD67ydQUJL9owRnJ3w2uODw3UsbzJ41cFGnHxX1PrX47Rgs/R89/NkU8f3XDPnGqwpxU/ZVZp1T25GinQZHLBBv9GjS3PT45SdtxVv6h0I6U1LS0n+WTX/Jqo9Dhyb8cZfg5eWGybQFFUMoqiyyAuiqGUVQWAvaDQ2iqCwFUVQygaCwF0C0NoFrgAFNAtDaBaABTXADQ5oFoAEtANUOaAa4GApoBrgbQLQCFNECaIFiPTJF1yFtLoLEDtLSCSLodioDaEkFRaQBQFEoPaTaAhdEoZRVDsQFESDoiQxAURIOi9oAAkRIOuC0hDAolB0XtCx0aug0uq4m/G5r77WZfSsFn9Q6qU5UsKcn/WkN0WT4GrxZv5JJv7GvTaP9g13WM1r95tp+K5aOdq0lkjKXR3PSJpQyR88Hu/QMsWXF1JQv/ci7fniv+DJ1TGlqJuvJzvwzz5YdV10ZN/By4ovH/wDyTd/2aOv1jjUSVeSzTTU3aKXFw1cvzRyZwTTsx5oqmuxuyVt+hh1U4YoOU5JJeWX5cSqzpYmzn58ab7CHBJN0bWr5XKYicalz2RzHE1Jg40jQ8eSeFwwq5Pi67GVN3wO9QdWXRPTU9XixPJPHC692aMCTTsbb4UezZpunqGP99nVpdmYNbDFJNPJS+x8p6d+M2sydXx6LXen8jWbIoQ+BPdPl12o9l6i6hPBL965Y00m0+Gr9x6vHBwtIW2du2VrsmKTlDdZhx6LFluSm2eF9deqeqdOwKXStKskZK55587fokYPw+9cdY1XVP2PX4JZISjfxYxa2v6nIelltc0UvUKM9h9Fngnp5pZFw+xqwpNJUZ+pa6OWGHHdz3f2HaSXy8mYvTtWaMOOLfujdhxpR7GSEqV0PjkdcBZCVmuDVceC20ZoZPd+Q3kSfhkWyloOTN/pbF8X1FoYO/wDeVNcHLWR3XH2Oz6KUpeqOn8qvjp8jwq5ozah1jl+jof8AiBy7dR0GEONjySr6VR4TFP42PY1w0eu/HbVY8/qPT6GUfnw4VJP6S/8Ao8Ro51LbafszTqXumyn0+NaaI70/UsGaSdp5OP6Jf8HRoydCxLHo5SX8eSUv71/wbqO5pVWGKMOpp5ZNAUVQdEo0FFC6KoZRVAFC6BobQNAKgK4BaGNFNAAraDQ1oGgAU0DQxoGgAU0C0NaAa4HYCmuAK4GtAtBYCWgWuBrXADQCFUQKiAI9TtJQe0tKxWIBIJIJItILABIug6JQ7ACiVwHRKGmJgUUkMolDIi9pdBUXQAAkTaMougChaREuBlcE2isYFEoPaSh2OhdHR6tOf7DlyxTayaTE2+/KuL/wYaOz01xb0DyJPFL4mGf0/iV/1Murhvgb/Tp7Mxyvw96nPF6s0Gmlk+XNvxtSfKbi2v8AB7zrSfx3K+PB5PU6fSafrvT9djwpZYazEt3snKv+T13qC4y7UuSnRweOVM6Gq2vURlFdo5EpX7GLX4/j6eeJ9pcWanJKPLM08icqS7HWcbRpxJp2hKgo41FeFRmzNJtGqUk0ZMqTlwc3Njp8GhCoKUna4MvVcWTPgeKeL4uPvR0UqXAvU5sWDC8mSaiorkUIbVRNOnZy+n9N6FoMePqWXp+DT6jG3UnH5l9foeI9V9Ww6zXuGPJujJun3sb6q69k1eZabSylLHJvseN/fR6pNZYSUYri+zDPkjs2onNSVs9Bl1Gix6SMcqjKMuJLbZUZx+GlotPjcey2pI4mXDqZxc/gylBXTrgT0vq/+namODMpzjLmjmuDrgzKFHsem9Py5Miz6r8y/Kk+EdnEttI5nSeraTVxSxy2uu0uDpKceaa+9mKaafJanQ+MqVcDoTi+Lr6HP+IuU2/uGppLciFClRpy53CfD+XyMw51OL2v7oyuSlBitM5Qk37oKKZdHQc+9Nnc/D+b/wD1doYxp/PbPMPK337+KPS/hnF5PWejT7QjKUq/sWYY/NGTU/1S/Qj8ZZzzfiBqMcIpyhhhFM4ej6PnXT9T1Oeox/C0qXxk32T7Udj8Rc+HVev+rfByJyw5I48iTumoo5csrn0TL0uW7FDPkjPM1/5iXZX4RPK1vdkdPccEEvsjbo4KGkxJfypjKCxxUccYrskki6PQx4SRyJO22LoqhlFUSsQuiqGNFUFgLopoZQNDsAKBoY0DQWIW1wC0MYNcDEKa4BaGtA0ACmgGhrQLXAAKaAaGtANAIUwGhrQFAIU0QOiDsD1W0ugtpdFYwaL2hpF7QsQFEoNL3JQ7EBRKDolDTEBRKDrgm0lYgKJQdFpBYAJFpB0RIVjoCibRm0m0VjF0ShlFUFgBRs0OFZ4KMszgsU91J1d//RmoitdmRklJUXafL7M1MPrurSngwaaMsmSOfHNpeEpJtv8Aoe59T18Jz7rueCSrse110vj9J08rvdhi2/0KoQ2TX5NsdT7+WLqqODu3R47AydLjuFVKl4Fzi27R00dqNASbSdGPPqMWKDnlmoJeZcDtdN4tNPI+KR8b9bdb1mXVOG+XwoSaaXYoyRT7Low3Kz6B1L1Tp8GSOLT/AL2cu23mzK9Hreq7s2tzPBpe/wCarPJ+gtRolKfUdZmjkeJ1CF8djv8AUfUUMuGc5TjtXaMexCOOMi+EHXxQ3IunaK8ejwRnJcPK1yc/Vx0s3LJmxYpSo85q+tanPkccGCcY3e45X7V1KWV5MmOUotvuzJnhHoseGS5Z3Z6/ZuhicVG6aSMs8mmzPdlwQk74klycL4fVJzlJL5W+19hbz6/FJqWN15ow+2Y8mOX2O9k0u6TnoslJd4t0ZH6h12mz/Bywmknwzj5eqZcMeVL6vtRg6j6ijnxRhki5STqyUcO7tWZ8mR41ye/6R6kwarJskmpX3vg9DhyprvaPjHTsrz54zwy2yT8M+o+ncrnoYqb+ddzLqcChzEjiyua5O9jdr6UHHgRj9/HgNy4d0ZVwSZc5ey5Ol6R189D1rHq1JqcIy2JfzVwcXPqIwjyx3pbqMF1rC2oy2zTtrsvcnC07Rnz1saNXSulSzT1fUs2o1EdVrdVkz5d1ctya5T+xtj07MlJS1EGmqtY+f8nVWT46+Mv4/mX6lUddaXFOKclycpZ8i4TFqNKkVQ2gWjYigXRVDGgWgsKAoGhlFVwMQuuCmuA6KoBC6Ka4DoqhgKBoY0C0AhbQNDGuAGiQC6AaGtcAtAKxTQDQ1rgFoAE0C0OaBaEFCaIM2kCx0epSCSCSLSKtwA0XtColD3ADRKDqyqGiIKRW0OiUMQFF7QqL2jsVAUXtDouhWMCiUHRKAAKJQdEoAoCiUHRKAKAolB0RIB0Lo6GDqE4YMWnlK4049+3Jjoya1yhODTST8kXxTNmhaWVI7W5N1ZPFnC1ObPLSRcMjjK1yvY6Gi1Dknu59jXHImehS4sDrj/6HI3ynHsfDfUOi1Ot1ObDp97lKdOuT7h1HdnwZMa7Hnun9AxQ1Xxprc5SuRRm3P6TRjcVFpnzL0/6A6uoyyx12TG5u5Y64/qex6V6X/Y8KWocpTb790fQNNpMOG9sVReqUfgySS5+hZhW1fIshqdkdsVweB6l03BFt4ltTOFqtJGE7VbfdI9b6hUlglsVtHjNXq88F/tptOkq7GLUyi5Oi9ZHVgyjCKktv0dGXJicrW1csqGTUSl8+6mb9FiUp7pLhe5gcq5M0shz10p51JPGmnxyhOX0dpZfO8KTu2euxKEVe1IOUlJclH8iS6M8p7uzw+PoMdPN7McYpccI9L0CPw4yi03RszY4zxS+VWZNJNY5un9CMsjmuSp0ujrrIox5fArLqIKL288maWV83Ix5HLc1ZUo2Vt8DM+WU2/b7nS9IRnPqijGKcabbrxTORF7oc92z1Xo6PwtQnitTyQe/jjb5LYRtpGXNKos9NGKjFRXZKiUHRTR20zmAFUHRVDsi0BQNB0SuBkRVA0NoFoYC6KoOgaAiBQNDKBoYhdA+BjQLQIBbAaG0DQxCqBoa0U48BY6FUgaGtFNCsBLj9AaHOPBTjwFjSEbfuQbtIKx0enSLSCSLSKbFQNEoOiUOwoCiUHREiUWRAolB0RIlZEBItIJIJIGwoCi6D2koW4dAUXQVF0FjSAoqhlEoLChdEoZRKCwoXX0JQyiqI7hpAUZupYXl0c1FfNH5o/obKLoNxODcZKSOFosl6aeOc9z4cX4ZuwPbBVX6HH67GXTMm+Cbw5JXH/tfsX0TXRypxc1u9i7GemwZFkhuR3N/D+pWGSUgd0VG13ErJUm2uF5LVRckdJzW0yZ533JgyqXbkKePfdcfcYlwcTXYPitprhs4Wv6VCSk0k0etz4HslTVnJ1VRi1Lujl6pUyxT4PLrp6T3SiuPYfDTxhjpROhPY+YvkRklXBynJsqcrM+3avqLk6j34+g7JKMvNGbLkhHu+CBAXmz7YUjPFqc9y4sVqdTCUmkuAMOSL/L+pZtdFUpGydKPFGfNLgJzqNttnG1vUPmeOPFPlkoQciptI6+nyY1JJtX9z33pHSPF096mdp5X8qa7RT4/r3/ofP/QXRdT1vWzyZXOGiwS25JV+d/yp/wCfY+uRioxUYpJJUkvBswYae5nPz5b4QNFUHRVGwyi6KoOimh2AtlNB1wDQ0yLAKDBHYhdFMOgaJCAoqg6KoBC2gaGNFUOxULaBoa0VQrHQraVQ3b9SnEW4aQmimhrjwUohZLaJaKcR1AtEbJbRLiQbRBWOj0iiXQaRKK7KwaJQaRVDTEBRKDolEkyNApE2h0WkOwoBIug9pe0VhQCRdB0XtCx0LolDKJtCwoXRKGbSmgsKAolDNpNorHQuiUM2k2isdAbSbQ9pFEVkqMXVNDDX6DLpcj274tKS7xfhnxXWdS6t0D1Nl0etk8OTFP5d3MckX2kn7M+7pHnvXfo/Sequi5cbjDHrsVPBqK+aHPK+xbhy7XybdHmeOdeGeb6Z6uhl0u7KsccvaN9my9N1WUpP9/ulK3Js+aavQdX9N6uWh6xp8jw29ueMXtftydPpWXDqoOGLWfDVUnfH2N6cfB6KFNWe56Z6ii9Rlg5LZDhW/wAx6nRdTxT00Mja5R8M6pKWh1dYs/xIJKVrtZu0vq7J8L4cZyi4xp/MRnxyiGVxPrvUuoYY45OL78cHldb1CNSSbdHkY+r/AI2FQnOKkn5YmXWNPO28ifvTOZqoymzO8ka4Z6TSauXxZ7pV7fYLU62EU5Rd15bPIf6vjW5xypt+LMHUOur4LhFtyZjWlbZS8iR6TX9ZgsU5718pwNf6lckoRdq7u/B5bVdSySUlKVJ+F5OVPPKbt2jVj0cV2Ysusa4R67L1uWeSUHx9Gd7pOoUNHuyTqTl/E+58602ZY38zVPnub8/VsmSOPBpot0+KHkwJqkVw1N8tns9d1ZYX8KElJvngz9O0+fWSc4x5c6i/CfucTpPT9Xqs27OpY8a7trlns+jYMekgnicrck22zNNKCpFsd0++j6/0Hp+HpvSNNosCqGOCv6t8t/q7ZtovEqxRX0RdGtdHPYFA0MrgEdiAooOgRoAKBaDBaGQAYNDGgaHYgGiqGUVtCwF0DQ7aVVBY0hVFUN2koVj2idpW0dtKcQskoidpTQ7aDtFZKhW0qhu0poLGkJrgGh7QNCsaQnaQZRBWOj0VFhJEoqsqBSJQVEpkkyLBolBUWkSTI0DRaXAVFpBuCgVEJIJIuiO4dAUXtCSL2huADaTaHtJtHYAbSbQ9pNotw6A2k2jEiUFjSF0TaMoraKxgUTaHRdCsdC6G6fjfzxtdg7Q8UVvp9mmhqXJOHEkeY67pMGuxT0+rwrNifeMux8x6v6ExvNkn0/VPSx7xxu2lyfV9Wnukq8nH1ePfacTpQntXB6fE+D4n1Xp/VNFKeLWYZ5MfZZILh/8AJwtQnBtQTi3+Zs+56vTqScKTr3OD1H07oNXfxdL5u4kllrsWTTqaPj37xy+oyCm/Lr2s951P0fjinLBGeNO+O9nms/QNXDI0pcfYhKcWYJ6OUejkuUnat15FSmknulx9zbqOm6jFOkm0KfScuR1kbiilyikZJQl0cfPkjKTrsLgp5MmzHCUn9Een0nQNMucm6f07HX02h0+GK+FijH6pFctRFdFK0spPk8ppuhavO18T91Dy2v8Ag9H0npOn0a4jvn/NI3xjJ9lwadNg3vc+3akZZ5pSNMNNCI3SRXZR7HZ6XivLjVRdziufq6MGKEYdkdfosVPqGl3KkssH9+TI2XtUj63XFFBMpnQTOMC1wDQYLQ7EACHRVcDBgNA0MolDsjQuitozaSgsdC9pW0bRVCsaVC6ZW0ZRKFZKhe0ravAzaSgsdCqKobtKoVjoVQNDWiqFuJUKoqhrQLQWFCqBoa0C4i3DoVX0IMogbh0ehS8EoNIqihMpBooOiUTUiNApESDSLUR7hUCkEkEl7FpC3DoFItIJIlC3DKSKDrkGuQ3AUWlZNoUE+Q3BQO0m0ZXJKDcFAJEpDKJQbhgJFUhlEoW4ELpEoZRVCsYFEquwdGXU9Q0uk1em02af73UTUYRXf7v6DTtkopt8HF1E38XJFvszFkjba5tmrqctmpmkle5mTfxz/VHST4PR4+rQn9li5NyS+xa0cE6/4NEWpS4Y1V/9BZJyZzNTpowhe1V9ji6/p+KcG3jjfukenz1Ti6afucrUR+Zp0Z88bjYVaPF67QYUm3CO458tHh8RVno+q41GT7W/JxZr5mc3czO4mL9kx03sXIcdPFNKv6GnY26dqv7lxTr6huYlEzQ00F/Cg1BRTodt5t9imqfgW4KoqEfdqzq+mo7+taWEpVD4sW3+py/q6s6fprQ9R6t1eGg6TjU9TW5zbqOKP80voOKt8EMi+Ls+n6TUS1XqLWaDBlU8OGaUJJXxXN/U6ut0ObRwxPM4v4ib48U+3+Do+j/TOl6B09YoTlqdVLnNqJrmcvNeyHeq4JYNO/8Aukv8HQqonnrW6k+DzpVB0VRFMmDRVB0VQbhgUSg6JQbhpC6JQzaShbhpCqZNo1KiqI7x0L2k2jKJQbkOhe0qhm0qhOQ6FtcA0NoGiO4aQugaG0DQbh0LaBoY1wDXAbh0KaBaGtA0G4KFUQMgWwo9FRKCoqipMpKJRdFpElIjRSQSRaQSQtw0gdpaQVEFYFbSJBUSh2IqinENIugsKF7QlGkGkShWOga4Loui0g3BQNEoKiUG4dApEpUHRKDcFAUSg6JGEp/li39kF2MZo9Fn1UM0sGP4ksUNyjdbn4Vnxb8Qeo9U0vW8z1Slg1kKltlHbsV2lH6cH6K9JYZYsWffBxcmuf6nm/xk/D2HrPoznocmPT9WwRfwMkl8s/8Atl9Pr4OjgxrZb7K8OpjHNslwvufJuj+qcPU8MHnnHHmaV2/zfVHUwz3q4vcvofHsC13SepZem6/Bl0uswSccmLJxTTq17o9R0zq+eEEviSX2ZXPUPHxJHr1FJcHvMeRxunQ+Go91aPJ4OqZ5x+bIm/ejTHqzhzW8hHWQ8kWl5O7qMlR3f4OZnybYyk3QuPWMWSO2eGUa9mZs2qxTckm9vgWTUwa4YJqqOT1XPHJke3+phjGTVd7N2ox45SlTr2oX8NJL6HPciiVWZ6inblyGoxcdxNRtj9RPxGrURdiSsZsio+/Jm1GbHjXzdxmXKscHKTpJcn0v8P8A8MMOfT4OsepcU55ZNZMOif5YR8Ofu/oW4sbmyvLlhhjumfPvSXpzrvq7WxwdL0k8WlT/AHutyxaxY19P5n9EfdvQfo7pnpHQzwaKWTUajNLdqNVmrfkftx2S8I9HosWLBgjgwYoYscfywhFJL9EFXznQx4lBHC1Otlm4XCCgkcn1Ur0eH6ZH/g7CXgx9YxrLpoY2k7yL/DLJRtGOHDPIbSbT0Eul4ZKlDb9mZ9T0eUY7sE97/lfcocJI0KcWcjaTaMcXFuMk00+UyUUuTLEhe0m0OiUR3EqF7SUM2koW4aQraTaMolcBuHQqkShlAtBY6AoGhlFUFjF0DQxoprgVgKaKYZTQWAugRlAtcBYCwWHQLHY6AIWQLA9HRVBURFCZTRVFpBJFpD3CoFIJIKiIW4KBougqJQKQUVRAki6HuCgUi6CSJQtwUVRKCoug3BQKRKColBuCgUi6Lobh0+bL/t45S+tcAm3wg4EUFjxyyS2wi5N+Ejp6bpMmt+oyKC/lXLNeKWHDjePDjUV5aXP6s2YtJOfMuER3rwYNPoIRV6hty/kj4+7NOSGyFwiopeEMcolTi54L7Jdzo48MMa4RG/ubPT2V5JZotcxr9TsI43Ro7M+T2cUdaybRz9Qvmzz3rL0V6c9V4Ph9Z6djy5I/kzw+XLD7SXJ8U9c/g91b09psvUOg6qfVdDjTnPDkX7+EfNVxJf3P0ZaoHJTi+UVzxRyKmadJ6jn09JO19mfjXRatSTcWzdHUN02+D3X47ehl0nWv1N0fTKGgzO9bjxx/25t/nS8J+T5thyraqfBx82B45Uz1uHPHPjU4+TrYs6knyMjL6s5+B72qaTNFy/hd+5nqiQ+77ANOrT5LUm1wSL5prlCEZcqble6xSxu7bZslBSv6FbPdsaYWb/Q/TYdV9adG0GaO7HLVRyZE+zjBOVf2R+jHLdJvtyfB/wAK2ofiV0i7pyyRV+7hI+66jJDBjlOSm6dKMVbZ1dKv+M4fqcm8iX4Djw3RIq5WVjctm5ppvwwoUaKOWGu5k6lljjeOUlwm3SHymopt+Dlzzy1muWLFG8WJ3Ofj7fcY4q2bMVtbn5GJ1JNri+QVw6C72BKgfUHTcWpww1OFKOWS7/zfc8zkwZcbanjlGvdHst6fS3CXeL4ZydRnltcWrXgzTwKTtE8M5JUefolHVl8LIv8AaSf2AhoYZeKeNvtIolp5Lo0Ka8nMaKo0arTZdPk2ZY17NdmJM747LV+ACqDBCx0DRQTKCwoGgQwQse0Fghg+AsNoDQIdA0FhQDBaDYL7BY6ABYbBaHYULogVECwo9JRKLotLgy7ikpIJItItINwFJF0WRINwFUSgkiBuAqi6LosNwFJEoKiJC3CKIFQ/T6PUZ+YwqP8ANLhEoqUnUVYnx2ZqG4NPmzOseOUvr4Otpem4MfzZX8WXt2R1NJjVrhKK8HSw+nTkt2R0UTzqK4Obouk48UPiahqc/EfC/wDc0qW2Likg9Vk3ZHGL4E+Dp48WPEqiipOUuZEXKFyjSG41bZcopotSsmnTMmSNx4BhmqDi1fuPmqMWWLU3z3ZFqixco3dPzfv5S9/B18c00ef0/Cv6nT02e40/6iTXTM2bHfJsy24NR7mWfCq3Y9SYLp+CyPBTDgySw4tdpM+j1WOOXHOLhOMlakmfmr8RPSc/SfqGelxxk9Bnuelm/CvmD+3g/UGOPdxj3PPfiL6Wn6o9OZun444o6l/NgnkfEJLzxyZ9TiWWP5N+h1nsZKf0s/L0G4O19joaWalGvIvqfT9V03qep6brPhvUaXK8eR43cXJd6fsLxboO0zgzi06Z6dcrg3x7siFYpbrd1+o1fcrBohG0lyR/TkRnbS5X6jFR2fQOZYfxE6FlbqP7Xsf/AKoyX/J+hsy2za9mfmHpWr/YuudN10k5rT6vFkcV3dS7H6f1UXLK5VW7mjraT+o4vqkanF/gTOdtL2AnnjGLrl/QRnd5/hRd1+ai9v6s0I5YnJDNqXsnNxg+8UbdPihixKEIqMV4ReGFctBz7DJCr5Ci+QEvmDSt8CGFKTUNq/L5ESjGT5RoknsdmfdUmqAaK+DBRb2qyor5kPXMBWNNz4ENGmemw6zSy084/N3i/KZ5fW6TNpMzx5Ytez8M9XjhOE1OPDRo1ePFnwTUoRlxa3IzZsCycrscMrxv8HhQTuZ9Fo3b2Sg37MyZdBjSezM39Npklpcq65NayRZzSn2NT0Wfmo7l9GIyY8mN1khKL+qKJQnD6kWRafQqgWG0CQ3EqBYLCZXgLCgAXwEyhphQDBaCKGnQ6AaAYwFhuChZC2iBuCj0yCRQRj3lJEi0iJkFuCi6JRaIPcRIkXREWnwG4KKSLoOEJTlthFyfskbcPTpJbtRLav5V3LcWOeV1BWRckuzDGLbqKbb8IdHTSXOV7F7Vb/ob5Sx4cTjhiofVct/qIbjNXbv3R08Xp8VzN2RUmwMc8OGXyYt7XmZox6uc3QuOOL4a3BwxxhL5I917nQxxjBVFURaRqxTcv0NkcuzTy92jHp03LwNz27j4o1xfxszzim6FKVzYViItpsOMuSi7LHEfjG0u4jG+B+N2i3E/BVIz549zNkhcToZIp2jLkhV12JyXknjkZsFrhmrBNL5WLUfoRxku3JS0SaTN+LKlw+w6M68HMjKV02NjmzY1UXa78jjLwyiWI6KzSu9toHLlWTFOMZyxzlFpS9n7itNljkTtVL6ByhXdfqWJJlO1J8n5i9Yeleu+mNdlXWN2ow5s0pw16bcczk2/m/ll9GcVpvsfq7qGh0mv0WXR67T49Tpsq25MeRWpI+Uer/wjljlLV+ldRUFz+w558f8Apm+f0ZzNTopOTnA9HpPU4TqOTh/fx/8AD5dhhJK6djHuaqqXsx+tw6vpetlouoaTLpNTF848qpte6919hEs8GuL5OW4tOmdZJvlBQXPD7mfWSS8/oNxTu39Ts+iPSur9W9VcI7sPTsEv+p1Pav8Asj/3f4HCDm6RCTWNOU+EhHoH0nrPV/VF8OUsPTdNki9TqHHu072R93/g/SGunDDCWXtGMODH0LpOh6R0zF03pmnjg0uFVCK/u2/L+oj1Rmmnh0ePmc1ul9jsYcftwo83q9T/ACMn4RmwTSTyN3KbN2ng63S7iOn6ZQSclbXPJvVVwi0zMrwBKq78hlNLlgCFUNxQ8sCKv7DocIRKip9jHlVTb9zc1f2M+ox1G0uUA4g4m9pWk51ck+yXBUH8pePjK67iYHQVVZWS/gSqVNcgQl8tsvKrxtfQRCjDLZLmcVICXwm72cltfUCV9kMtSGY1hT5i/wBBjx4MqppNdqkhEUPi6jbEIzZ+i6XLFuKlCXvF8f0ONrularTXLY8mP+aK7fc9FHfNtxbo04VOEXbtPwzPk0uOa6pko5pw/J4N9ij2et6VodYm2vg5PE4r/KPPdT6NrNE92342LxOCtfqvBz8umyY+e0aseeE+OmctgvsGB4M240UDRTLYLY7AoBhWBYWBKIC2QdgeoostEXJz0ygiIXRKHYiWWVRo0OkzazN8PEu35pPskSgnN7Y9ibSVsTFN8JWzp6HpU8kfi6i4Q7qP8T/9jqaLQafSx+X55+ZtGnyd7SelJfLN/oxZNTfETmZoPDi26fGsarl+TJhlNSnub/VndyY1KDOVnxbckq7nUljjGPx6DFkUuBFWBPiL+gce1MvZceWVF/QvFk+fn3Nad8GZYalx7mrFHdKiUexSaHYEkt3kKXLZEq4LLG+KM9+REofMwEqfJpyLixDIE4u0HB/KOwvmjNBsdifzEoOpEZIfJ8ipq2wpvn9AV3L5shFC9lEiuBqKSKiW4XsT8FtDCpcisEyYntfBtxSU40YOzHaeVSJpleSNqx0lsdeC6i0HKmKaceUSKlycP156W0Xqj0/n0eXFD9shBy0eevmx5EuKftfdH5g3ZsObNp9Vjli1GCbhlg1TjNOmj9fQyLz3Pj34s/hv1LrPrfT67oEcOPH1GNazJP8AJglH/wAxrza8e5i1On93ldna9H1ixt4srpdo+cekuia/1H1SHTenP5pU82XusMPMn9fZH6Q6B0jS9G6Vg6do8cceHDFJUuZPzJ+7b5MHoX0r0z0j0RaDRt5Mj+fUamaqWaflv2XsvBs1HXNLjm4YMeTUzTr5eI/1DBpliVvshr9a9RLbD6UdWKhjhLJkkowirbfZI4kp/tutyavbcX8uO/5UBlnrOouPxpfDw+Mcez+/ub8WJQikl2L5SXSOclXLJjjQQVNWVXHJAkBRJfcPigHb7CGgYrljYrtRWOFjYqgJWSC+gOSN8DYrgtRsaRDcctrZOUfqXhX/AFPHlUN1UNuZPjkCKrNFruRZaNlcbQ+DcsafuZ83+6378jtK90HH2AgzFJfPJP3Kxw3TofnxVmbXkbosaTlMCd0rFLT8N0F8JVTNcGm2LycS7BRBSsCMVHsGrf2KSDjHgYiqrsTBnj8Rxa4rn2LyJqDS7iIRUbXdghPlHL9VdFj8GWv0cKS/3IxXj3PKM+iYNQ4xcHyvZnnfUPQlHHPXaFfu++TF/L9V9Dl6zSv64f5Nel1FfCf+DzbYDCYLOYmdApgPsEC+wWFA3RCMg7Cj1RaKstGBMqLIQLFCWTJHHCLlKTpJDTvojSGaPTZNVnWLGufL8Je56LHix6PTrDh/9UvMmBo8MNDg+FHmb5nL3YUp7j1vp2gWnjvn9T/9HOyzeR/gfgluxfqGBgj+4/UpOlR00rMzXLHRfh9jFrYre2aFJi9X80dyIyXDHj4kcqfEn4XgOPsBm/MHBcWZTcw0rNOOChC35EYYtySNU34LIcKymb8FIke7KCXtZGyDJNfIzLZsq4sxTVWgJYy4tjcT5QmPYZidSXsEeyclwPyf8CoS57jJ/cRdSuy3IQiuDQmRP2EqQal7ldioInhgqSIpKgCipd6odp1bszt+R+Gaj5JRfIpJ0a49yUBGaasvevctoz0yskE13ow67W4tJDZKe/I+0VyaM+WcoSjj4f8AMcSWmzY3PcpTlLvLu2VTyUuC2EfuVqFl1kP3mVuD/hXYZptJDHxGKC0eKdP5Glfk3Y4KMfFlN2ToHHiUVz3GJUVZYwoF+5VBPkle4DAa8BKPBdck79gGXjVJssuKqNErkZGw4IbGPAvGh8C/GuLKpMw63HauuUZop2mdTPDcmYJQlGTSKpxpl2OVoXqXUl9S9PPbNMmsj+RrsLg67kCXg2Zo742u6JH5MLXkmmncXG+xNVxjYqIX4Kwyv7klzO2Bp+V+gcU3JvwMZajY1KisaLfCYEW7Al3EX8z5NDXymb+J0CGRqnY/Sz2S55XlCq55LquwyL5PNerOi/sk3rdJG9NN/Ml/A/8A2POeD6fpnDJGWnzJSxzW1p9mjwHqTps+ldSngdvFL5sUveJwtfpfae+HTOlo8+//AI5do5rBbKb4AbObuN+0KyC3Ig9wbT1tlpgWXZz9xRQafB6L0xo1GD1eRfNLjHft5ZwdBglqtVDCuzfzP2Xk9djcce2EFUYqkvod30XSe7N5ZLhdfsw62bUdi8iuoY3FuS7MxwkdbUR+JgfvRyJJptUeok+DJge6NM6GD/ZVFeQNHL93TY2SVWicJWit8NoEHOrwhFZHWIJdDXZytQvnruFBcBZI3N2M02PdLnsjMo26NbdKxunioRt92Xd2FLtwBG+Scvsim75CiWu5SCRWRYcVwzFlXLOhjrazDl/MyyS+KHifLAj2Ci6f6grsWnyVouY+XNCX3GbuKYpsm5WQiiWEmAFHyQJMtspflIRdgAsNMGP1Lk+S+EPLIsOMn2sZj7MRHuPx/lbG5pcEJIj7kRRaM5Emxc8AuIZQgsU1yUgpd2VwBMojZdEoAKQyMfJWNWxlUTjHyRbKdFUFREh0IuPCGQl4FeC4umTg64ItWaGriZsuLlvwasbuIE42mNq0VxlTObq+McV9RHg1a1fKvuZ64KKNUei9PLbkX9x+t/8Ax3JeDND8xqyLfpZx47CE+xWkdv8AQ0zqKpPuYtDL56XsaJNz1O3xFARH4/ylSfNe4XgHu39AEi/DMUHc5M15XtxSf0MeFDQ0OSspvgtPgoAovHJxkn9RXqjQ4+p9NcOFngt2N+z9v1LcnFphQnLJJuXkjkgskXGXTBNxkpLwfMZtxbTVNcNMW5HpPWnSP2ab6jgX7rJKskUvyyfn7P8AyeVczymfDLDNwkegwzjlgpIZuIJ3MhSW7T2KZdilIPEnkyRhBXKTSSOYpWU7aPSemtOoaPJq5Lmb2R+y7nTi77DI4I4On48MVxjikZ4yqR9G9PwLT6eMPP8A2cCU/dk5GzC3VMxa3GottGzC7QvWx3Ym/Y0PyinG9szHgbNmP/bZgxPna33NkeI0QxLkuyItd2DmfZF3TAyJuTLZdEF2JlC2NxpY4tFxjT5KycFdbVZNu+ALtloqIVFTYyJB0SEXZclTaJwhfJFsPH+VmDPxNm3G+GZNWvn/AEJ5PpHi7Yruief1Jb2kXcpLwwQ2UhIRVFohF5GBAkvlJHtdBSLscOLYmwV3Kf5mW3QLfLFOfhAXFsfi/J+pnj+Y04/ylJCRaIyF+AIFIlgy44KUgHRUu7LS4K8hfwsBgtEohaBIYWPgNgQ7hl18EGREITwRIkK8llCGh2nl3Q1q0ZcUqZri00Ti7RVNUzB1CNQT+qMq7G/qMbwtrwYFZXJcl2N3ECqlwasXMGvdGeldmjC7tESTMmhSWplH2NWBfvckvqZdGq12VfU14vzS+4EGOk6i2DiV92VkfH0KxNSv6ACE66XzKAGHsyan/ef0DxLcrXYESXRaKfCpBykoxE7lYwBavuNxKkC+4zEuUgQmDqtPDVaTJp8sd0JqpI+UdT089Fr82lycyxyav3Xhn15s+a/iPGOL1BuXHxMMZP721/wcv1bGnjU/KOh6bNqbh9zgb2Qz/E+pDz52aPbbzr+lcPxuqqbVxxRc39+yOCsn2PY+jNP8Ppk9S182adR+y/8Akz+jYff1cU+lz/oya6Xt4W/vwegb3YmjBJVM24vJl1UKdo+ifdHncXDoZgbrgc/mg0Y8U2n9DVCS8CTsJxaZydVuw6i+67nQhJTxxmuzRn6rjbwvIlyuSunZIvRwuS5boIKpFre6KY3UT+HHd9TQ4qrMHUYuejyxj3q0bdNP4mlxz/mgmSshJcJkaEZfzGh8RZmyd+CvIOBcFxwHFFRQ7GqVlcY2DdFRjSBlyG0RqzSuiCYqIjVK5foalHuZ9QuSuf0lkHyZmRX2oPsgUuWU2X2ERELSvkQigoq0ykuRkY1H6lmOG5iboiVEZfYB9yyc64RECToD3ouTd8lfYoGXhdyNkF8pjwumzdg5iIjJ0ikuCUNrgpRGVbhM0LRomuBMlTYiyLspfULwKjPkYn8oEmimWkSgo/QlETJC7DKiQkQZZCIgCLRRcfuRoQA9mPwz4oS+xeNhF0xNWh+eKlikvocjHfK8o7PDgcl/LlnH6jmGJ8NErgPACuUHi4ZWWsy4vl6nl54aRqwPmX3Mraj1D7odiyRi5W/IFcuxmWTdpdysbWODlfC7gY3utt933ByOWR7Yfl/yIEBFSz6jtSfLG6rPjwRUI8y9kLz5o6aHw8fOWX9jNjx3LfLmT7sY7L35cjt9hmOMmxuONLsNhFLkBgU4obhjfNgZFY3EqgqGgC7X9D5p+KsMmPrOmyyT2ZNOkn9VJ3/lH0aeS8ihdRXMn9DzP4oaVaz01LUxit+mayRrxFun/m/0MevxvJgkl+/9GnRZFDPG/PB8teT6kMTyP3IeXPSUe9wOebNDFjW6c5KMV7tn1PBp1pNBg00e2KCjfu/J86/DjSvXeoY5ZK8emj8R/fsv/wDfQ+m5uUzqf+M6XZGWZ+eP8HF9ayr3Y4l45YrHILKlKDQi2mOi9yPUtHHarkxNOLaY7Fk8WFnx7otruZYTcZuL7lUvi7RcvmjbJboNPk4sY/Czy0suJJuWJ+6OxhlujXcxdZ0ss2GOTFxlxvdF/wDBP6laIwdPay9PmjnjLHOt8eGvc2aWOzTxh/KqPPSyZZNavDHbkh/uw8s7+hzQz6WOWDtMUHYTVIZkfyszJXI0ZP8AbYqK5FPsUOg4R5HVQMFUQiUVSIN2VRCEJCII1UeEx8e4GqVojLlEoOpGGSKGNcC6d0jOaURBRTsiXAUVySjFydBZeOL7sN1REU2XtqCohdgSfDAbZcn3BM92MFlNpBdyJKxAmXihbUjZjtGbEr4Rpx9mBCQxFpAphR5AqI4iMseGaBeVXFgOLowPhjcLuLvuDlhTLwKrGaLtDUg0iorgIkitsoiInbLARCyEEIiIiiWAFsFcBJ+5GkADsMri0czqNwzbl2Zug6TMvUo7sW7+Vg2RiqZmxTpVfBpg13Rz1Lmh0Mny9xEkwclvWbvZGOWolk18tPDvfP0NUn89mbounmtZn1GV7pZMj2/9sfAh9nWx4lHGot/cTqdVDAtkLc32G6nJHFhlOT7HM06eXK8slcn49kJCDwYpOTnkluk3bZsx4/LVBYsW1WNSGCKUOC1F+ORkIX2GxhFLtyAWIWPzJ/oJz50ltQ7VS2wZz5W7YDQO9ttc89wdbhhqtHm0uRXDLilja+6oJR5sKP5kmKr4GuOT8/Z9+HPkxT4lCTjJfVOiB+sU9N6q6nhfjUzf9Xf/ACQ8lOG2TR62D3RTPs/4NY4f6Rrc9fvJZ1Bv6KKaX92e2b+ZohD0npCrSQ/X/Z5f1N3q8n7M2ThsrE3ZCHVRR4GTbRl1iSVruQhGX0hi7EKcoSTi6N2OTnjcn3IQhiJSOPqYrHqt0OG1ybeiRUFqIx4Tnur6kIEfqHPo25PysDGrZCDl2Vx6H+AW/mohCaIIshCABIlajvX0IQi+hrsyPyAvzEIZzSug/cKPchDRi6IsjdCm3yQhXk7F4K8A+LIQrAiJ5ZCAMZh/P+hrguCEBEJgyCXBCAR8BoqRCDImTMgcT4IQC9dD49i2QhLwQBXf9QiEEBCEIAiLsUQggLiUyEACRfcXq/8A8fJ9iEADlhQ8kIAin3C6e3382QghiOq5Jy1Cxt/LV0bNFCKgqXghA8AbP4WFFJyohBIBj4dLsEiEGIw9QbtKzLEhBE10WT+IhBgfAvxN49ddUS//AHI//wBUQhDzGf8Atl+2epwf1R/SP//Z";

/* ─────────────── DATA ─────────────── */
const SKILLS_BACKEND = [
  { name: "Java 17+",                    level: 95, icon: "☕", tag: "Expert"       },
  { name: "Spring Boot 3.x",             level: 93, icon: "🌿", tag: "Expert"       },
  { name: "Spring Security / JWT",        level: 82, icon: "🔐", tag: "Proficient"   },
  { name: "Microservices Architecture",   level: 88, icon: "🧩", tag: "Proficient"   },
  { name: "System Design (LLD/HLD)",      level: 80, icon: "🏗️", tag: "Proficient"   },
  { name: "Apache Kafka",                 level: 78, icon: "⚡", tag: "Proficient"   },
  { name: "MySQL / PostgreSQL",           level: 85, icon: "🗄️", tag: "Proficient"   },
  { name: "Redis / Caching",              level: 74, icon: "🔴", tag: "Intermediate" },
  { name: "Docker & Kubernetes",          level: 74, icon: "🐳", tag: "Intermediate" },
  { name: "AWS (EC2/S3/RDS/Lambda)",      level: 80, icon: "☁️", tag: "Proficient"   },
  { name: "REST / gRPC APIs",             level: 88, icon: "🔗", tag: "Proficient"   },
  { name: "CI/CD (GitHub Actions/Jenkins)", level: 76, icon: "🔄", tag: "Proficient" },
  { name: "JUnit 5 / Mockito / TDD",      level: 82, icon: "🧪", tag: "Proficient"   },
  { name: "Monitoring (Prometheus/Grafana)", level: 65, icon: "📊", tag: "Intermediate" },
];

const SKILLS_FRONTEND = [
  { name: "ReactJS",         level: 72, icon: "⚛️", tag: "Intermediate" },
  { name: "JavaScript ES6+", level: 78, icon: "🟡", tag: "Intermediate" },
  { name: "TypeScript",      level: 68, icon: "🔷", tag: "Intermediate" },
  { name: "HTML5 / CSS3",    level: 85, icon: "🎨", tag: "Proficient"   },
  { name: "Git / GitHub",    level: 90, icon: "📂", tag: "Proficient"   },
  { name: "Linux / Bash",    level: 75, icon: "🐧", tag: "Proficient"   },
];

const EXPERIENCE = [
  {
    company: "MCT Cards",
    role: "Software Developer",
    type: "Full-time",
    period: "Jan 2024 – Present",
    duration: "1+ yr",
    color: "#00d4ff",
    loc: "Noida, India",
    points: [
      "Architected auto-registration pipeline for 500+ mobile NVRs → cut manual ops by 80%",
      "Led TDD adoption across team → 20% reduction in post-release defects",
      "Designed & shipped Kafka-based event-driven backend processing 10K+ events/min",
      "Integrated NetSDK for video management with <100ms latency",
      "Mentored 2 junior engineers — improved sprint velocity by 30%",
    ],
    stack: ["Java 17", "Spring Boot", "Kafka", "Redis", "MySQL", "NetSDK", "Docker"],
    impact: "80% ops automation · 10K events/min",
  },
  {
    company: "XenonStack",
    role: "Associate Software Engineer",
    type: "Java Developer",
    period: "Feb 2023 – Dec 2023",
    duration: "11 mo",
    color: "#7c6af5",
    loc: "Remote",
    points: [
      "Optimized 12+ SQL queries and indexing strategies → 40% faster data retrieval",
      "Built custom inverted-index search algorithm → 50% drop in validation workload",
      "Delivered 8 RESTful APIs for high-throughput microservices (5K RPS)",
      "Maintained 95%+ unit test coverage using JUnit 5 & Mockito",
      "Shipped 6 sprint cycles using Git, Jira, and Bitbucket in Agile workflow",
    ],
    stack: ["Java 11", "Spring Boot", "MySQL", "JUnit 5", "Mockito", "REST APIs"],
    impact: "40% DB speedup · 5K RPS APIs",
  },
  {
    company: "INADEV",
    role: "Backend Engineer",
    type: "Intern → GTE",
    period: "Feb 2022 – Jan 2023",
    duration: "12 mo",
    color: "#34d399",
    loc: "Delhi, India",
    points: [
      "Built 15+ Spring Boot modules from requirement to production",
      "Reduced system errors by 20% via structured root cause analysis",
      "Optimized microservices for fault tolerance using Circuit Breaker pattern",
      "Directly collaborated with clients on 4 technical requirement sessions",
    ],
    stack: ["Java 8", "Spring Boot", "Microservices", "REST", "Agile"],
    impact: "20% error reduction · 15 modules",
  },
];

const ACHIEVEMENTS = [
  { value: "80%",  label: "Ops automated",        icon: "🤖", desc: "MCT Cards pipeline"    },
  { value: "50%",  label: "Validation cut",         icon: "⚡", desc: "XenonStack algorithm"  },
  { value: "40%",  label: "DB speed boost",          icon: "📈", desc: "Query optimization"    },
  { value: "20%",  label: "Defects eliminated",      icon: "🛡️", desc: "via TDD adoption"      },
];

const PROJECTS = [
  {
    name: "NVR Auto-Registration System",
    tag: "Production",
    tagColor: "#00d4ff",
    desc: "End-to-end pipeline for auto-registering 500+ mobile NVRs. Reduced manual intervention by 80% and integrated with Kafka for real-time event streaming.",
    stack: ["Java", "Spring Boot", "Kafka", "MySQL", "NetSDK"],
    metrics: ["500+ NVRs automated", "80% ops reduction", "10K events/min"],
    icon: "🔧",
  },
  {
    name: "High-Throughput Microservices Platform",
    tag: "Architecture",
    tagColor: "#7c6af5",
    desc: "Designed and built microservices handling 5K+ RPS with custom search algorithms, JWT-secured APIs, and Redis caching for sub-50ms response times.",
    stack: ["Java", "Spring Boot", "Redis", "JWT", "Docker", "AWS"],
    metrics: ["5K+ RPS", "<50ms p99 latency", "95%+ test coverage"],
    icon: "🏗️",
  },
  {
    name: "Backend Monitoring Stack",
    tag: "DevOps",
    tagColor: "#34d399",
    desc: "Built observability pipeline using Prometheus metrics + Grafana dashboards. Automated alerting reduced MTTR from 45min to under 10min.",
    stack: ["Prometheus", "Grafana", "Docker", "Spring Boot Actuator"],
    metrics: ["45min → 10min MTTR", "12 dashboards", "Real-time alerts"],
    icon: "📊",
  },
];

const EDUCATION = {
  degree: "B.Tech — Computer Science Engineering",
  institute: "XYZ University",
  year: "2022",
  score: "CGPA: 8.2/10",
  highlights: ["Data Structures & Algorithms", "Database Systems", "OS & Computer Networks", "Software Engineering"],
};

const CERTIFICATIONS = [
  { name: "AWS Certified Developer – Associate",         issuer: "Amazon Web Services", year: "2024", icon: "☁️", color: "#fb923c" },
  { name: "Spring Professional Certification",           issuer: "VMware",              year: "2023", icon: "🌿", color: "#34d399" },
  { name: "Problem Solving (Gold Badge)",                issuer: "HackerRank",          year: "2023", icon: "🏆", color: "#febc2e" },
  { name: "500+ LeetCode Problems Solved",               issuer: "LeetCode",            year: "2024", icon: "⚡", color: "#00d4ff" },
];

const TARGET_COMPANIES = ["Google","Amazon","Microsoft","Flipkart","Paytm","Razorpay","PhonePe","CRED","Swiggy","Zomato","Meesho","Groww"];

const TERMINAL_LINES = [
  { text: "$ ssh abhishek@25lpa-target.dev",                            delay: 0,    color: "#00d4ff" },
  { text: "> Connected. Loading profile...",                            delay: 700,  color: "#5a7090" },
  { text: "$ cat stack.json",                                           delay: 1500, color: "#00d4ff" },
  { text: '> Java17 · SpringBoot3 · Kafka · Redis · K8s · AWS',        delay: 2200, color: "#34d399" },
  { text: "$ git log --stat --format='%s [%h]' | head -5",             delay: 3200, color: "#00d4ff" },
  { text: "> feat: NVR pipeline 500+ devices automated [a3f1d2]",       delay: 4000, color: "#e2eaf8" },
  { text: "> perf: DB query 40% faster via index opt [b7c2e9]",         delay: 4500, color: "#e2eaf8" },
  { text: "> feat: Kafka consumer 10K events/min [d9a4f1]",             delay: 5000, color: "#e2eaf8" },
  { text: "$ ./salary_target.sh --current-band",                        delay: 6000, color: "#00d4ff" },
  { text: "> Target: ₹25–40 LPA  Status: READY ✅",                    delay: 6700, color: "#fb923c" },
  { text: "$ ./available_for_hire --open-to-relocation",                delay: 7500, color: "#00d4ff" },
  { text: "> OPEN · Pan-India · Hybrid/Remote preferred",               delay: 8200, color: "#34d399" },
];

/* ─────────────── CURSOR ─────────────── */
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({ x:0, y:0 }), rp = useRef({ x:0, y:0 }), raf = useRef(null);
  useEffect(() => {
    const mv = e => { pos.current={x:e.clientX,y:e.clientY}; if(dot.current) dot.current.style.transform=`translate(${e.clientX-4}px,${e.clientY-4}px)`; };
    const loop = () => { rp.current.x+=(pos.current.x-rp.current.x)*0.12; rp.current.y+=(pos.current.y-rp.current.y)*0.12; if(ring.current) ring.current.style.transform=`translate(${rp.current.x-20}px,${rp.current.y-20}px)`; raf.current=requestAnimationFrame(loop); };
    window.addEventListener("mousemove",mv); raf.current=requestAnimationFrame(loop);
    return ()=>{ window.removeEventListener("mousemove",mv); cancelAnimationFrame(raf.current); };
  },[]);
  return (<>
    <div ref={dot} style={{position:"fixed",top:0,left:0,width:8,height:8,background:"#00d4ff",borderRadius:"50%",pointerEvents:"none",zIndex:9999}} />
    <div ref={ring} style={{position:"fixed",top:0,left:0,width:40,height:40,border:"1.5px solid rgba(0,212,255,0.5)",borderRadius:"50%",pointerEvents:"none",zIndex:9998}} />
  </>);
}

/* ─────────────── TERMINAL ─────────────── */
function Terminal() {
  const [vis,setVis]=useState([]); const [typed,setTyped]=useState({});
  useEffect(()=>{
    TERMINAL_LINES.forEach((l,i)=>{
      setTimeout(()=>{
        setVis(v=>[...v,i]); let ch=0;
        const iv=setInterval(()=>{ ch++; setTyped(t=>({...t,[i]:l.text.slice(0,ch)})); if(ch>=l.text.length) clearInterval(iv); },22);
      },l.delay);
    });
  },[]);
  return (
    <div style={{background:"#060c1a",border:"1px solid rgba(0,212,255,0.18)",borderRadius:14,overflow:"hidden",position:"relative"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,#00d4ff60,transparent)"}} />
      <div style={{display:"flex",alignItems:"center",gap:6,padding:"0.8rem 1.2rem",background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
        {["#ff5f57","#febc2e","#28c840"].map((c,i)=><div key={i} style={{width:11,height:11,borderRadius:"50%",background:c}}/>)}
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",color:"#4a6080",marginLeft:8}}>abhishek@portfolio ~ terminal</span>
      </div>
      <div style={{padding:"1.1rem 1.2rem",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.75rem",lineHeight:1.9,minHeight:120}}>
        {TERMINAL_LINES.map((l,i)=>vis.includes(i)&&(
          <div key={i} style={{color:l.color}}>
            {typed[i]||""}{typed[i]&&typed[i].length<l.text.length&&<span style={{borderRight:"2px solid #00d4ff",animation:"blink .7s infinite"}}>&nbsp;</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── SKILL BAR ─────────────── */
function SkillBar({ skill, index }) {
  const [w,setW]=useState(0); const ref=useRef(null);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){setTimeout(()=>setW(skill.level),index*60);obs.disconnect();} },{threshold:0.2}); if(ref.current) obs.observe(ref.current); return()=>obs.disconnect(); },[]);
  const tc = skill.tag==="Expert"?"#00d4ff":skill.tag==="Proficient"?"#34d399":skill.tag==="Intermediate"?"#fb923c":"#6b7280";
  return (
    <div ref={ref} style={{marginBottom:"0.9rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.35rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.4rem"}}>
          <span style={{fontSize:"0.9rem"}}>{skill.icon}</span>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.78rem",color:"#e2eaf8",fontWeight:500}}>{skill.name}</span>
        </div>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.6rem",color:tc,background:`${tc}18`,border:`1px solid ${tc}30`,padding:"0.12rem 0.5rem",borderRadius:4}}>{skill.tag}</span>
      </div>
      <div style={{background:"#111827",borderRadius:4,height:4,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${w}%`,background:`linear-gradient(90deg,#00d4ff,#7c6af5)`,borderRadius:4,transition:"width 1.1s cubic-bezier(.4,0,.2,1)"}} />
      </div>
    </div>
  );
}

/* ─────────────── EXP CARD ─────────────── */
function ExpCard({ exp, index }) {
  const [open,setOpen]=useState(index===0); const [vis,setVis]=useState(false); const ref=useRef(null);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){setVis(true);obs.disconnect();} },{threshold:0.1}); if(ref.current) obs.observe(ref.current); return()=>obs.disconnect(); },[]);
  return (
    <div ref={ref} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(24px)",transition:`all 0.55s ease ${index*0.1}s`,background:"#0c1222",border:`1px solid ${open?exp.color+"40":"rgba(255,255,255,0.07)"}`,borderRadius:14,overflow:"hidden"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"1.4rem 2rem",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem"}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.65rem",flexWrap:"wrap",marginBottom:"0.3rem"}}>
            <span style={{width:9,height:9,borderRadius:"50%",background:exp.color,boxShadow:`0 0 8px ${exp.color}`,flexShrink:0,display:"inline-block"}}/>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:"1.1rem",fontWeight:700,color:"#e2eaf8"}}>{exp.company}</span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",color:exp.color,background:`${exp.color}15`,border:`1px solid ${exp.color}30`,padding:"0.18rem 0.55rem",borderRadius:4}}>{exp.type}</span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",color:"#5a7090"}}>📍 {exp.loc}</span>
          </div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.74rem",color:"#5a7090"}}>
            {exp.role} · <span style={{color:"#8099b8"}}>{exp.period}</span>
          </div>
          {open&&<div style={{marginTop:"0.5rem",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",color:exp.color,background:`${exp.color}10`,border:`1px solid ${exp.color}25`,padding:"0.25rem 0.65rem",borderRadius:4,display:"inline-block"}}>⚡ {exp.impact}</div>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"0.75rem",flexShrink:0}}>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",background:"#111827",color:"#5a7090",border:"1px solid rgba(255,255,255,0.07)",padding:"0.25rem 0.7rem",borderRadius:100}}>{exp.duration}</span>
          <span style={{color:"#5a7090",transform:open?"rotate(180deg)":"rotate(0)",transition:"transform 0.3s",fontSize:"1.1rem"}}>▾</span>
        </div>
      </div>
      {open&&(
        <div style={{padding:"0 2rem 1.6rem",borderTop:`1px solid ${exp.color}18`}}>
          <ul style={{listStyle:"none",margin:"1rem 0 1.1rem"}}>
            {exp.points.map((p,i)=>(
              <li key={i} style={{display:"flex",gap:"0.65rem",marginBottom:"0.5rem",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.78rem",color:"#8099b8",lineHeight:1.65}}>
                <span style={{color:exp.color,flexShrink:0,marginTop:2}}>▸</span>{p}
              </li>
            ))}
          </ul>
          <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
            {exp.stack.map(s=><span key={s} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.63rem",color:"#5a7090",background:"#111827",border:"1px solid rgba(255,255,255,0.07)",padding:"0.22rem 0.6rem",borderRadius:4}}>{s}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────── PROJECT CARD ─────────────── */
function ProjectCard({ proj, index }) {
  const [vis,setVis]=useState(false); const ref=useRef(null);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){setVis(true);obs.disconnect();} },{threshold:0.1}); if(ref.current) obs.observe(ref.current); return()=>obs.disconnect(); },[]);
  return (
    <div ref={ref} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(24px)",transition:`all 0.55s ease ${index*0.12}s`,background:"#0c1222",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"1.75rem",display:"flex",flexDirection:"column",gap:"1rem",position:"relative",overflow:"hidden"}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,212,255,0.25)";e.currentTarget.style.transform="translateY(-4px)";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.transform="translateY(0)";}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${proj.tagColor},transparent)`}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{fontSize:"1.8rem"}}>{proj.icon}</div>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:proj.tagColor,background:`${proj.tagColor}15`,border:`1px solid ${proj.tagColor}30`,padding:"0.18rem 0.6rem",borderRadius:4}}>{proj.tag}</span>
      </div>
      <div>
        <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.05rem",color:"#e2eaf8",marginBottom:"0.5rem"}}>{proj.name}</h3>
        <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.76rem",color:"#5a7090",lineHeight:1.7}}>{proj.desc}</p>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem"}}>
        {proj.metrics.map(m=><span key={m} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:"#34d399",background:"rgba(52,211,153,0.08)",border:"1px solid rgba(52,211,153,0.2)",padding:"0.18rem 0.6rem",borderRadius:4}}>✓ {m}</span>)}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"0.35rem",marginTop:"auto"}}>
        {proj.stack.map(s=><span key={s} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.6rem",color:"#5a7090",background:"#111827",border:"1px solid rgba(255,255,255,0.07)",padding:"0.18rem 0.5rem",borderRadius:3}}>{s}</span>)}
      </div>
    </div>
  );
}

/* ─────────────── SECTION HELPERS ─────────────── */
function Orbs() {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      {[{x:"12%",y:"18%",s:500,c:"rgba(0,212,255,0.035)",a:"orbFloat1 20s ease-in-out infinite"},{x:"80%",y:"55%",s:600,c:"rgba(124,106,245,0.04)",a:"orbFloat2 25s ease-in-out infinite"},{x:"45%",y:"88%",s:380,c:"rgba(52,211,153,0.03)",a:"orbFloat1 17s ease-in-out infinite reverse"}].map((o,i)=>(
        <div key={i} style={{position:"absolute",left:o.x,top:o.y,width:o.s,height:o.s,borderRadius:"50%",background:`radial-gradient(circle,${o.c},transparent 70%)`,transform:"translate(-50%,-50%)",animation:o.a}}/>
      ))}
      <style>{`@keyframes orbFloat1{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-56%) scale(1.07)}}@keyframes orbFloat2{0%,100%{transform:translate(-50%,-50%) scale(1.04)}50%{transform:translate(-47%,-50%) scale(1)}}`}</style>
    </div>
  );
}

function Section({ id, children, dark=false }) {
  const ref=useRef(null); const [vis,setVis]=useState(false);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true); },{threshold:0.04}); if(ref.current) obs.observe(ref.current); return()=>obs.disconnect(); },[]);
  return (
    <div style={{width:"100%",background:dark?"#070d1a":"transparent",position:"relative",zIndex:1}}>
      <section id={id} ref={ref} style={{maxWidth:1140,margin:"0 auto",padding:"7rem 2rem",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(36px)",transition:"all 0.75s cubic-bezier(.4,0,.2,1)"}}>
        {children}
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title, accent }) {
  return (
    <div style={{marginBottom:"3rem"}}>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",color:"#00d4ff",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"0.5rem",display:"flex",alignItems:"center",gap:"0.4rem"}}>
        <span style={{color:"#7c6af5"}}>//</span> {eyebrow}
      </div>
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.9rem,4vw,3rem)",fontWeight:800,color:"#e2eaf8",letterSpacing:"-0.03em",lineHeight:1.1}}>
        {title} <span style={{background:"linear-gradient(135deg,#00d4ff,#7c6af5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{accent}</span>
      </h2>
      <div style={{marginTop:"0.9rem",display:"flex",alignItems:"center",gap:"0.7rem"}}>
        <div style={{width:48,height:2,background:"linear-gradient(90deg,#00d4ff,#7c6af5)",flexShrink:0}}/>
        <div style={{flex:1,height:1,background:"rgba(255,255,255,0.06)"}}/>
      </div>
    </div>
  );
}

/* ─────────────── MAIN ─────────────── */
export default function Portfolio() {
  const [activeNav,setActiveNav]=useState("hero");
  const [scrolled,setScrolled]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);

  useEffect(()=>{
    const fn=()=>{
      setScrolled(window.scrollY>50);
      for(const id of ["hero","about","skills","projects","experience","education","contact"]){
        const el=document.getElementById(id);
        if(el){const r=el.getBoundingClientRect();if(r.top<=130&&r.bottom>=130){setActiveNav(id);break;}}
      }
    };
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const goTo=id=>{ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMobileOpen(false); };
  const NAV=[{id:"about",n:"01"},{id:"skills",n:"02"},{id:"projects",n:"03"},{id:"experience",n:"04"},{id:"education",n:"05"},{id:"contact",n:"06"}];

  return (
    <div style={{background:"#03050f",minHeight:"100vh",width:"100%",color:"#e2eaf8",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300;1,9..144,500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;background:#03050f}
        body{width:100%;cursor:none;overflow-x:hidden}
        #root{width:100%;background:#03050f}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#00d4ff;border-radius:2px}::-webkit-scrollbar-track{background:#03050f}
        ::selection{background:rgba(0,212,255,0.3);color:#fff}
        a,button{cursor:none}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes heroIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spinRing{to{transform:rotate(360deg)}}
        @keyframes spinRingR{to{transform:rotate(-360deg)}}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(0.7);opacity:0.4}}
        @keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes gridLine{0%{opacity:0;transform:scaleX(0)}100%{opacity:1;transform:scaleX(1)}}
        .nhov:hover{color:#00d4ff!important}
        .btnGlow:hover{box-shadow:0 0 28px rgba(0,212,255,.45)!important;transform:translateY(-2px)!important}
        .cardHov{transition:all .25s}
        .cardHov:hover{border-color:rgba(0,212,255,.25)!important;transform:translateY(-4px)!important}
        .pillHov{transition:all .2s}
        .pillHov:hover{color:#00d4ff!important;border-color:rgba(0,212,255,.3)!important}
        .socHov{transition:all .2s}
        .socHov:hover{background:rgba(0,212,255,.1)!important;border-color:rgba(0,212,255,.4)!important;color:#00d4ff!important}
        @media(max-width:900px){.hero-grid{grid-template-columns:1fr!important}.right-col{order:-1}}
        @media(max-width:700px){.nav-links{display:none!important}.hamburger{display:flex!important}.skills-grid{grid-template-columns:1fr!important}.proj-grid{grid-template-columns:1fr!important}.contact-grid{grid-template-columns:1fr!important}.about-grid{grid-template-columns:1fr!important}}
        @media(max-width:500px){.hero-ctas{flex-direction:column!important}.hero-metrics{gap:1rem!important}}
      `}</style>

      <Cursor /><Orbs />

      {/* ── GRID BG ── */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,opacity:.22}}>
        <svg width="100%" height="100%" style={{position:"absolute",inset:0}}><defs><pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(0,212,255,0.07)" strokeWidth="0.6"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
      </div>

      {/* ── NAV ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:600,padding:scrolled?"0.7rem 2.5rem":"1.2rem 2.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",background:scrolled?"rgba(3,5,15,0.94)":"transparent",backdropFilter:scrolled?"blur(22px)":"none",borderBottom:scrolled?"1px solid rgba(0,212,255,0.09)":"1px solid transparent",transition:"all .35s"}}>
        <button onClick={()=>goTo("hero")} style={{background:"none",border:"none",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#e2eaf8",display:"flex",alignItems:"center",gap:"0.4rem"}}>
          <span style={{color:"#00d4ff",fontFamily:"'JetBrains Mono',monospace"}}>{"<"}</span>AM<span style={{color:"#00d4ff",fontFamily:"'JetBrains Mono',monospace"}}>{"/>"}</span>
        </button>
        <div className="nav-links" style={{display:"flex",gap:"1.6rem",alignItems:"center"}}>
          {NAV.map(n=>(
            <button key={n.id} className="nhov" onClick={()=>goTo(n.id)} style={{background:"none",border:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",color:activeNav===n.id?"#00d4ff":"#5a7090",letterSpacing:"0.08em",textTransform:"uppercase",position:"relative",padding:"0.2rem 0",transition:"color .2s"}}>
              <span style={{color:"#7c6af5",fontSize:"0.58rem",marginRight:3}}>{n.n}.</span>{n.id}
              {activeNav===n.id&&<span style={{position:"absolute",bottom:-3,left:0,right:0,height:1,background:"linear-gradient(90deg,#00d4ff,#7c6af5)",borderRadius:1}}/>}
            </button>
          ))}
          <button onClick={()=>goTo("contact")} className="btnGlow" style={{background:"transparent",border:"1px solid #00d4ff",color:"#00d4ff",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",padding:"0.45rem 1.1rem",borderRadius:6,transition:"all .25s",letterSpacing:"0.06em"}}>
            Hire Me
          </button>
        </div>
        {/* hamburger */}
        <button className="hamburger" onClick={()=>setMobileOpen(v=>!v)} style={{display:"none",flexDirection:"column",gap:5,background:"none",border:"none"}}>
          {[0,1,2].map(i=><span key={i} style={{display:"block",width:22,height:1.5,background:"#e2eaf8"}}/>)}
        </button>
      </nav>

      {/* mobile overlay */}
      {mobileOpen&&<div style={{position:"fixed",inset:0,background:"rgba(3,5,15,0.97)",zIndex:700,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2.5rem"}}>
        <button onClick={()=>setMobileOpen(false)} style={{position:"absolute",top:24,right:24,background:"none",border:"none",color:"#5a7090",fontSize:"1.4rem"}}>✕</button>
        {NAV.map(n=><button key={n.id} onClick={()=>goTo(n.id)} style={{background:"none",border:"none",fontFamily:"'Syne',sans-serif",fontSize:"1.8rem",fontWeight:700,color:"#e2eaf8"}}>{n.id}</button>)}
      </div>}

      {/* ── HERO ── */}
      <div id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"6rem 2rem 4rem",position:"relative",zIndex:1,width:"100%"}}>
        <div className="hero-grid" style={{maxWidth:1140,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:"4rem",alignItems:"center"}}>

          {/* LEFT */}
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:"0.55rem",background:"rgba(52,211,153,0.07)",border:"1px solid rgba(52,211,153,0.25)",borderRadius:6,padding:"0.38rem 0.9rem",marginBottom:"1.75rem",animation:"heroIn 0.7s ease 0.1s both"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#34d399",boxShadow:"0 0 8px #34d399",animation:"pulse 2s ease-in-out infinite"}}/>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",color:"#34d399",letterSpacing:"0.07em"}}>Open to ₹25–40 LPA opportunities</span>
            </div>

            <div style={{animation:"heroIn 0.7s ease 0.22s both"}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.74rem",color:"#3a4a60",marginBottom:"0.3rem"}}>{"// Senior Backend Engineer"}</div>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(3.2rem,6vw,5.2rem)",fontWeight:800,lineHeight:1.0,letterSpacing:"-0.03em"}}>
                <span style={{background:"linear-gradient(135deg,#e2eaf8 30%,#8099b8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Abhishek</span>
              </h1>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(3.2rem,6vw,5.2rem)",fontWeight:800,lineHeight:1.0,letterSpacing:"-0.03em",marginBottom:"0.6rem"}}>
                <span style={{background:"linear-gradient(135deg,#00d4ff,#7c6af5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Mishra</span>
              </h1>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.74rem",color:"#3a4a60",marginBottom:"1.6rem",lineHeight:1.8}}>
                {"{"} role: <span style={{color:"#fb923c"}}>"Java · Spring · Microservices"</span>, yoe: <span style={{color:"#34d399"}}>3</span>,<br/>
                {"  "}target: <span style={{color:"#fb923c"}}>"25–40 LPA"</span>, open: <span style={{color:"#34d399"}}>true</span> {"}"}
              </div>
            </div>

            <p style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontWeight:300,fontSize:"1rem",color:"#8099b8",lineHeight:1.8,maxWidth:480,marginBottom:"1.75rem",animation:"heroIn 0.7s ease 0.38s both"}}>
              3+ years architecting high-throughput backends with Java & Spring Boot. I build systems that handle <span style={{color:"#00d4ff",fontStyle:"normal"}}>millions of events</span>, survive real failures, and keep companies moving.
            </p>

            {/* metrics */}
            <div className="hero-metrics" style={{display:"flex",gap:"1.75rem",marginBottom:"2rem",animation:"heroIn 0.7s ease 0.52s both",flexWrap:"wrap"}}>
              {ACHIEVEMENTS.map((a,i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.35rem",fontWeight:800,background:"linear-gradient(135deg,#00d4ff,#7c6af5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{a.value}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.58rem",color:"#4a6080",letterSpacing:"0.04em",marginTop:2}}>{a.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-ctas" style={{display:"flex",gap:"0.9rem",flexWrap:"wrap",marginBottom:"1.75rem",animation:"heroIn 0.7s ease 0.65s both"}}>
              <a href="ResumeFs.pdf" target="_blank" rel="noreferrer" className="btnGlow" style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"linear-gradient(135deg,#00d4ff,#7c6af5)",color:"#03050f",padding:"0.75rem 1.85rem",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem",textDecoration:"none",transition:"all .25s",letterSpacing:"0.02em"}}>
                ↓ Download Resume
              </a>
              <button onClick={()=>goTo("contact")} className="btnGlow" style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"transparent",color:"#e2eaf8",padding:"0.75rem 1.85rem",borderRadius:8,border:"1px solid rgba(255,255,255,0.14)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:"0.85rem",transition:"all .25s"}}>
                Let's Connect →
              </button>
            </div>

            {/* socials */}
            <div style={{display:"flex",gap:"0.6rem",flexWrap:"wrap",animation:"heroIn 0.7s ease 0.78s both"}}>
              {[{l:"GitHub",h:"https://github.com/abhishekmishra9051/",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>},{l:"LinkedIn",h:"https://linkedin.com/in/abhishekmishra9051/",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>},{l:"LeetCode",h:"https://leetcode.com/abhishekmishra9051/",i:"⚡"},{l:"HackerRank",h:"https://hackerrank.com/abhishekmishra93/",i:"🏆"}].map(s=>(
                <a key={s.l} href={s.h} target="_blank" rel="noreferrer" className="socHov" style={{display:"flex",alignItems:"center",gap:"0.35rem",padding:"0.38rem 0.8rem",borderRadius:6,border:"1px solid rgba(255,255,255,0.09)",color:"#5a7090",textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.66rem",letterSpacing:"0.04em"}}>
                  {s.i} {s.l}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="right-col" style={{display:"flex",flexDirection:"column",gap:"1.4rem",animation:"heroIn 0.7s ease 0.28s both"}}>
            {/* Photo */}
            <div style={{position:"relative",display:"flex",justifyContent:"center",marginBottom:"0.5rem"}}>
              <div style={{position:"absolute",inset:-18,borderRadius:"50%",border:"1px dashed rgba(0,212,255,0.18)",animation:"spinRing 28s linear infinite"}}>
                {[0,90,180,270].map(d=><div key={d} style={{position:"absolute",top:-4,left:"50%",width:8,height:8,borderRadius:"50%",background:d===0?"#00d4ff":d===90?"#7c6af5":d===180?"#34d399":"#fb923c",boxShadow:`0 0 10px ${d===0?"#00d4ff":d===90?"#7c6af5":d===180?"#34d399":"#fb923c"}`,transform:`translateX(-50%) rotate(${d}deg) translateY(-148px)`}}/>)}
              </div>
              <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"1px solid rgba(124,106,245,0.14)",animation:"spinRingR 20s linear infinite"}}/>
              <div style={{width:210,height:210,borderRadius:"50%",background:"linear-gradient(135deg,#00d4ff,#7c6af5,#fb923c)",padding:3,position:"relative",zIndex:1}}>
                <div style={{width:"100%",height:"100%",borderRadius:"50%",overflow:"hidden",position:"relative",background:"#0c1222"}}>
                  <img src={PHOTO} alt="Abhishek Mishra" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center"}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 50%,rgba(0,212,255,0.03) 50%)",backgroundSize:"100% 4px",pointerEvents:"none"}}/>
                </div>
              </div>
              {[{l:"Java Expert",c:"#00d4ff",t:"2%",r:"-15px",d:"0s"},{l:"Spring Boot",c:"#34d399",b:"8%",le:"-12px",d:"1.2s"},{l:"₹25–40L",c:"#fb923c",t:"38%",r:"-22px",d:"0.6s"}].map(b=>(
                <div key={b.l} style={{position:"absolute",top:b.t,right:b.r,bottom:b.b,left:b.le,background:"#0c1222",border:`1px solid ${b.c}30`,borderRadius:8,padding:"0.36rem 0.7rem",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",color:b.c,whiteSpace:"nowrap",animation:`floatBadge 3.5s ease-in-out ${b.d} infinite`,zIndex:2}}>
                  <span style={{width:5,height:5,borderRadius:"50%",background:b.c,display:"inline-block",marginRight:5}}/>{b.l}
                </div>
              ))}
            </div>
            {/* Terminal */}
            <Terminal/>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <Section id="about">
        <SectionHead eyebrow="Who am I" title="About" accent="Me"/>
        <div className="about-grid" style={{display:"grid",gridTemplateColumns:"1fr 1.65fr",gap:"4rem",alignItems:"start"}}>
          <div style={{display:"flex",flexDirection:"column",gap:"0.85rem"}}>
            {[{v:"3+",l:"Years Backend Dev",s:"Production-grade Java systems",c:"#00d4ff"},{v:"B.Tech",l:"CSE Graduate",s:"Computer Science Engineering",c:"#7c6af5"},{v:"500+",l:"NVRs Automated",s:"MCT Cards pipeline project",c:"#34d399"},{v:"₹25-40L",l:"Target Package",s:"Senior Backend / 2025",c:"#fb923c"}].map((s,i)=>(
              <div key={i} className="cardHov" style={{background:"#0c1222",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"1.1rem 1.4rem",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:`linear-gradient(180deg,${s.c},${s.c}55)`}}/>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.6rem",color:s.c,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.2rem"}}>{s.l}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.7rem",fontWeight:800,color:"#e2eaf8",lineHeight:1}}>{s.v}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.64rem",color:"#4a6080",marginTop:"0.2rem"}}>{s.s}</div>
              </div>
            ))}
          </div>
          <div>
            <p style={{fontFamily:"'Fraunces',serif",fontSize:"1.02rem",fontStyle:"italic",fontWeight:300,color:"#8099b8",lineHeight:1.9,marginBottom:"1.4rem"}}>
              I'm a <span style={{color:"#e2eaf8",fontStyle:"normal",fontWeight:500}}>Senior Java Backend Engineer</span> targeting ₹25–40 LPA roles. I build production systems that handle millions of requests, survive real failures, and ship real business value.
            </p>
            <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.82rem",color:"#5a7090",lineHeight:1.85,marginBottom:"1.2rem"}}>
              Core expertise: <span style={{color:"#00d4ff"}}>Java 17 + Spring Boot 3.x</span>, event-driven systems with <span style={{color:"#34d399"}}>Kafka</span>, distributed caching via <span style={{color:"#fb923c"}}>Redis</span>, cloud infra on <span style={{color:"#7c6af5"}}>AWS</span>. I understand <span style={{color:"#00d4ff"}}>System Design (LLD/HLD)</span>, write clean APIs, and own features end to end.
            </p>
            <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.82rem",color:"#5a7090",lineHeight:1.85,marginBottom:"1.75rem"}}>
              I've automated 80% of manual ops, increased DB throughput by 40%, and mentored engineers to ship faster. I'm ready for <span style={{color:"#fb923c"}}>FAANG-adjacent complexity</span> and product-first companies.
            </p>
            {/* target companies */}
            <div style={{marginBottom:"1.5rem"}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:"#3a4a60",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.65rem"}}>// Target Companies</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem"}}>
                {TARGET_COMPANIES.map(c=><span key={c} className="pillHov" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.66rem",color:"#5a7090",background:"#111827",border:"1px solid rgba(255,255,255,0.07)",padding:"0.25rem 0.65rem",borderRadius:5}}>{c}</span>)}
              </div>
            </div>
            {/* tech pills */}
            <div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:"#3a4a60",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.65rem"}}>// Tech Stack</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem"}}>
                {["Java 17","Spring Boot 3","Kafka","Redis","MySQL","AWS","Docker","K8s","REST","gRPC","TDD","CI/CD","JWT","OAuth2","Prometheus"].map(t=><span key={t} className="pillHov" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.66rem",color:"#5a7090",background:"#111827",border:"1px solid rgba(255,255,255,0.07)",padding:"0.25rem 0.65rem",borderRadius:5}}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SKILLS ── */}
      <Section id="skills" dark>
        <SectionHead eyebrow="What I work with" title="Skills &" accent="Expertise"/>
        <div className="skills-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.75rem"}}>
          {[{title:"Backend & Infrastructure",icon:"⚙",ac:"rgba(0,212,255,0.08)",bc:"rgba(0,212,255,0.18)",skills:SKILLS_BACKEND},{title:"Frontend & Tooling",icon:"🎨",ac:"rgba(124,106,245,0.08)",bc:"rgba(124,106,245,0.18)",skills:SKILLS_FRONTEND}].map(g=>(
            <div key={g.title} style={{background:"#0c1222",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"1.85rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"1.75rem",paddingBottom:"0.9rem",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{width:34,height:34,borderRadius:8,background:g.ac,border:`1px solid ${g.bc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.95rem"}}>{g.icon}</div>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.72rem",color:"#8099b8",letterSpacing:"0.09em",textTransform:"uppercase"}}>{g.title}</span>
              </div>
              {g.skills.map((s,i)=><SkillBar key={s.name} skill={s} index={i}/>)}
            </div>
          ))}
        </div>

        {/* system design callout */}
        <div style={{marginTop:"2rem",background:"linear-gradient(135deg,rgba(0,212,255,0.05),rgba(124,106,245,0.05))",border:"1px solid rgba(0,212,255,0.14)",borderRadius:14,padding:"1.75rem 2rem",display:"flex",alignItems:"center",gap:"2rem",flexWrap:"wrap"}}>
          <div style={{fontSize:"2.5rem"}}>🏗️</div>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",color:"#e2eaf8",marginBottom:"0.4rem"}}>System Design Ready (LLD + HLD)</div>
            <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.76rem",color:"#5a7090",lineHeight:1.7}}>
              Experienced with <span style={{color:"#00d4ff"}}>HLD interviews</span>: URL shorteners, notification systems, payment gateways, rate limiters. Solid grasp of CAP theorem, consistent hashing, DB sharding, CQRS, Saga pattern.
            </p>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem",marginLeft:"auto"}}>
            {["CAP Theorem","DB Sharding","CQRS","Saga Pattern","Rate Limiting","Load Balancing","Message Queues","Cache Strategies"].map(t=><span key={t} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.6rem",color:"#00d4ff",background:"rgba(0,212,255,0.08)",border:"1px solid rgba(0,212,255,0.2)",padding:"0.2rem 0.55rem",borderRadius:4}}>{t}</span>)}
          </div>
        </div>
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="projects">
        <SectionHead eyebrow="What I've built" title="Key" accent="Projects"/>
        <div className="proj-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}}>
          {PROJECTS.map((p,i)=><ProjectCard key={p.name} proj={p} index={i}/>)}
        </div>
      </Section>

      {/* ── EXPERIENCE ── */}
      <Section id="experience" dark>
        <SectionHead eyebrow="Career journey" title="Work" accent="Experience"/>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          {EXPERIENCE.map((e,i)=><ExpCard key={e.company} exp={e} index={i}/>)}
        </div>
      </Section>

      {/* ── EDUCATION + CERTS ── */}
      <Section id="education">
        <SectionHead eyebrow="Background & credentials" title="Education &" accent="Certifications"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem"}}>
          {/* education */}
          <div style={{background:"#0c1222",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"2rem",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#00d4ff,transparent)"}}/>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:"#00d4ff",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.75rem"}}> // Education</div>
            <div style={{fontSize:"2rem",marginBottom:"0.75rem"}}>🎓</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.05rem",color:"#e2eaf8",marginBottom:"0.3rem"}}>{EDUCATION.degree}</h3>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.74rem",color:"#5a7090",marginBottom:"0.25rem"}}>{EDUCATION.institute}</div>
            <div style={{display:"flex",gap:"0.75rem",marginBottom:"1.25rem",flexWrap:"wrap"}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",color:"#34d399",background:"rgba(52,211,153,0.08)",border:"1px solid rgba(52,211,153,0.2)",padding:"0.2rem 0.6rem",borderRadius:4}}>Grad: {EDUCATION.year}</span>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",color:"#00d4ff",background:"rgba(0,212,255,0.08)",border:"1px solid rgba(0,212,255,0.2)",padding:"0.2rem 0.6rem",borderRadius:4}}>{EDUCATION.score}</span>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem"}}>
              {EDUCATION.highlights.map(h=><span key={h} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:"#5a7090",background:"#111827",border:"1px solid rgba(255,255,255,0.07)",padding:"0.2rem 0.55rem",borderRadius:4}}>{h}</span>)}
            </div>
          </div>

          {/* certifications */}
          <div style={{display:"flex",flexDirection:"column",gap:"0.85rem"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",color:"#7c6af5",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.25rem"}}> // Certifications & Achievements</div>
            {CERTIFICATIONS.map((c,i)=>(
              <div key={i} className="cardHov" style={{background:"#0c1222",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"1rem 1.25rem",display:"flex",gap:"1rem",alignItems:"center",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:`linear-gradient(180deg,${c.color},${c.color}55)`}}/>
                <div style={{fontSize:"1.4rem",flexShrink:0}}>{c.icon}</div>
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:"0.88rem",color:"#e2eaf8",marginBottom:"0.15rem"}}>{c.name}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.64rem",color:"#5a7090"}}>{c.issuer} · {c.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DSA/Competitive callout */}
        <div style={{marginTop:"2rem",background:"linear-gradient(135deg,rgba(124,106,245,0.05),rgba(0,212,255,0.05))",border:"1px solid rgba(124,106,245,0.15)",borderRadius:14,padding:"1.5rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1.5rem"}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",color:"#e2eaf8",marginBottom:"0.35rem"}}>⚡ DSA & Competitive Programming</div>
            <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.74rem",color:"#5a7090"}}>500+ LeetCode problems solved · Arrays, Trees, Graphs, DP, Sliding Window, Two Pointers</p>
          </div>
          <div style={{display:"flex",gap:"0.75rem"}}>
            {[{l:"LeetCode",h:"https://leetcode.com/abhishekmishra9051/",c:"#fb923c"},{l:"HackerRank",h:"https://hackerrank.com/abhishekmishra93/",c:"#34d399"}].map(p=>(
              <a key={p.l} href={p.h} target="_blank" rel="noreferrer" className="btnGlow" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",color:p.c,background:`${p.c}10`,border:`1px solid ${p.c}30`,padding:"0.45rem 1rem",borderRadius:6,textDecoration:"none",transition:"all .25s"}}>{p.l} →</a>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" dark>
        <SectionHead eyebrow="Let's connect" title="Contact" accent="Me"/>
        <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem",marginBottom:"2.5rem"}}>
          {[{l:"Email",v:"abhishekmishra9051@gmail.com",i:"✉️",h:"mailto:abhishekmishra9051@gmail.com"},{l:"LinkedIn",v:"linkedin.com/in/abhishekmishra9051",i:"💼",h:"https://linkedin.com/in/abhishekmishra9051/"}].map(c=>(
            <a key={c.l} href={c.h} target="_blank" rel="noreferrer" className="cardHov" style={{display:"flex",alignItems:"center",gap:"1.1rem",background:"#0c1222",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"1.75rem",textDecoration:"none"}}>
              <div style={{width:48,height:48,borderRadius:12,background:"rgba(0,212,255,0.08)",border:"1px solid rgba(0,212,255,0.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0}}>{c.i}</div>
              <div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.6rem",color:"#4a6080",letterSpacing:"0.12em",textTransform:"uppercase"}}>{c.l}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:"0.9rem",fontWeight:600,color:"#e2eaf8",marginTop:"0.15rem"}}>{c.v}</div>
              </div>
            </a>
          ))}
        </div>
        {/* banner */}
        <div style={{background:"linear-gradient(135deg,rgba(0,212,255,0.05),rgba(124,106,245,0.07))",border:"1px solid rgba(0,212,255,0.14)",borderRadius:16,padding:"3rem 2rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,#00d4ff,#7c6af5,transparent)"}}/>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",color:"#00d4ff",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"0.9rem"}}>// Available · ₹25–40 LPA · Pan-India · Remote/Hybrid</div>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.4rem,3vw,2.1rem)",fontWeight:800,color:"#e2eaf8",marginBottom:"0.7rem",letterSpacing:"-0.02em",lineHeight:1.2}}>
            Ready to build something<br/><span style={{background:"linear-gradient(135deg,#00d4ff,#7c6af5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>extraordinary at scale.</span>
          </h3>
          <p style={{fontFamily:"'Fraunces',serif",fontSize:"0.92rem",fontStyle:"italic",fontWeight:300,color:"#5a7090",marginBottom:"2rem"}}>
            If you're building at scale and need a senior backend engineer who delivers — let's talk.
          </p>
          <a href="mailto:abhishekmishra9051@gmail.com" className="btnGlow" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"linear-gradient(135deg,#00d4ff,#7c6af5)",color:"#03050f",padding:"0.88rem 2.4rem",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.92rem",textDecoration:"none",transition:"all .25s",letterSpacing:"0.02em"}}>
            ✉️ Reach out now
          </a>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer style={{width:"100%",padding:"1.75rem 2.5rem",borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",position:"relative",zIndex:1}}>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",color:"#2a3a50"}}><span style={{color:"#7c6af5"}}>//</span> © 2026 Abhishek Mishra · Java Backend Engineer · Built with React + Vite</span>
        <div style={{display:"flex",gap:"1.4rem"}}>
          {[{l:"GitHub",h:"https://github.com/abhishekmishra9051/"},{l:"LeetCode",h:"https://leetcode.com/abhishekmishra9051/"},{l:"HackerRank",h:"https://hackerrank.com/abhishekmishra93/"}].map(l=>(
            <a key={l.l} href={l.h} target="_blank" rel="noreferrer" className="nhov" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.67rem",color:"#2a3a50",textDecoration:"none",transition:"color .2s"}}>{l.l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
