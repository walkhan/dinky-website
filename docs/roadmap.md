---
position : 7
id: roadmap
title: Road Map
---


### 任务生命周期管理

FlinkSQL 生命周期：创建、开发、调试、发布、上线、注销。

Dlink 的 FlinkSQL Studio 负责 FlinkSQL 的开发和调试，在确定最终的 SQL 口径及任务配置后，可通过任务发布功能自动地在运维中心注册测试或生产环境下的最终任务，同时具备版本的管理，将开发与运维分离，保证生产环境的稳定性。

在运维中心可以上线已发布的任务，或者将已上线的任务进行下线，然后可以通过维护功能将任务重新进入开发和调试的进度。

最后，可以在运维中心注销已经不需要或者错误的任务，将被彻底删除。

### 元数据管理

Dlink 目前支持对外部元数据的采集功能，将建设统一的元数据管理，使其可以不需要依赖第三方元数据平台，独自进行更加适应实时数仓的元数据消费操作，统一规范拥有大量数据表、复杂关系的建设需求。

元数据主要包含采集、构建、管理、同步功能。

采集：Dlink 通过 SPI 来扩展实现更多数据源的元数据采集功能，使其可以轻松对接第三方存储库、元数据平台等，甚至可以将消息队列的元数据采集进行扩展，以便于洞悉实时数仓的流数据结构。

构建：Dlink 提供构建逻辑表、字段、关系的能力，解耦外部存储层。通过词根维护来规范命名定义。

管理：Dlink 支持对逻辑表和物理表的结构的可视化管理能力，可添加物理表不支持的信息如标签、分类、注释、权限等。

同步：Dlink 支持自动或手动地将元数据变动同步至对应数据源，或根据逻辑表在数据源上创建物理表。

### 血缘和影响分析

Dlink 目前具备任务表级的 FlinkSQL 血缘分析，通过 FlinkSQL 解析并构造后的 StreamGraph 来获取血缘关系，规避了冗余 Create Table 等的影响，同时支持多 Create View 的语句，使 FlinkSQL 结构更加清晰明了易于维护。

FlinkSQL 任务被发布到运维中心时，会自动生成血缘关系，与元数据管理的元数据信息做对应，进而形成全局的数据链路关系，便同时得到了影响分析。拥有了血缘和影响分析，便更加方便的管理和优化所有的数据任务。

处在 Studio 开发环节的任务，则可以根据已发布的任务构成的数据链路关系来获取自身的全局血缘及影响分析。

单从血缘分析来说，含有表级、字段级、记录级。Dlink 将完善字段级血缘并开放，记录级则是未来探索的一个方向，记录级的血缘将会更直观地展现出数据的治理过程，便于排查数据内容问题。

### 集群运维

Dlink 目前的 FlinkSQL 敏捷需要提取部署好外部的环境才能使用，而该过程目前是通过人工手动进行，需要进行复杂的运维操作，此外还要解决因依赖导致的各种问题。

Dlink 将对集群环境的搭建和启停等操作进行自动化地支持。

首先配置免密通信集群的节点信息，将部署资源提前放到 Dlink 目录下或通过镜像地址进行下载，通过集群模板的配置来分发和部署所使用的 Flink 资源及其他资源，若为 K8S 环境则打包镜像并装载至容器。资源到位后可直接通过 Dlink 启动对应集群如 Standalone 、Yarn-Session 和 K8S-Session等。做到集群部署运维托管 Dlink 。

### 运行监控

Dlink 需要对集群资源及 Flink 作业进行时序监控，支持外部对接 Prometheus 消费定制化的时序数据。

Dlink 通过 SPI 的方式来实现自定义监控接口实现，使其可以插件化地管理不同的中间件的不同的 Metrics 的实现或者对接外部 Metrics 采集组件。

Dlink 通过 JobManager 对 Flink 作业进行状态监控，反馈异常的指标，辅助用户对作业进行口径或者参数优化。

### 报警推送

Dlink 通过 SPI 来扩展报警方式，将先实现钉钉的报警插件，后续企业号、邮箱等留给社区贡献开发。

Dlink 通过自定义报警规则及内容模板来触发报警或者推送报表，使用户第一时间知晓生产环境的异常状况以及其自定义的报表及推送信息如批流任务启停、依赖任务启停、集群操作推送等。

### 依赖调度

Dlink 定位是批流一体平台，不排除用户存在大量的复杂依赖关系的调度需求。

Dlink 提供依赖调度引擎，通过全局的数据链路关系自动获得任务的 DAG 图，根据指定的依赖调度作业参数手动或定时拉起守护线程 Daemon，Daemon 通过子调度组、 DAG 及节点权重、并行度、黑名单、超时时间、异常处理策略、任务历史执行信息、运行监控反馈的资源信息等来通过 SDJF（短依赖作业优先）算法进行大量依赖作业的动态调度编排，合理充分利用资源的同时缩短整个数仓的数据同步周期。Daemon 触发报警规则或异常时会进行报警，执行完所有的任务后会触发推送，并根据后驱依赖调度组配置进行递归调度。

在容错方面，Daemon 可以在异常任务处跳过当前节点或后续影响节点，也可触发停止并报警。当 Daemon 因异常原因停止后，由于其自身状态信息根据归档周期进行持久化存储，所以可以从最新的快照恢复 Daemon ，从而恢复后续任务的正常执行。当然可以对Daemon进行暂停、或停止操作，进行作业维护，维护成功后可以恢复执行。

以上的特性将使用户无需梳理复杂的依赖关系或者手动配置 DAG，也不需要估测调度间隔或者长期观察任务执行情况进行手动优化。由于 Daemon 依据任务历史执行数据作为调度影响因子，随着时间的推移会自动编排出最合适的并行调度计划（类似于机器学习）。此外由于子依赖调度组的设计可以在执行前合并子组的 DAG，使用户可以将大量任务以业务主题划分调度组，更有利于作业的维护，而其后驱依赖调度组的设计则可以以时序的方式隔离两个调度组，实现隔离 DAG 调度。

### 作业自动恢复

Dlink 批流一体的发展趋势必然会出现越来越多的流或批流一体任务。

而其守护线程 Daemon 分为两者，一种是上文说到的依赖调度守护线程，另一种则是实时任务守护线程。在实时任务守护线程下，Daemon 支持根据 savepoint 周期配置项来周期性地进行 savepoint 的触发，满足在任务异常失败后自动从 savepoint 恢复的机制，checkpoint 则依赖 Flink  自身的恢复能力自动从 checkpoint 恢复任务，当然也可以通过 RocksDB 管理 checkpoint 并存储至文件系统，Daemon 在任务异常失败后自动从 checkpoint 恢复。可见两种恢复机制的成本不一样，根据具体需求选择。周期性的备份状态自然会造成大量的冗余文件，可以配置保留的备份次数，自动清除过期状态。当作业超过失败重启次数后，Daemon 会自动报警；当满足推送周期可自动推送任务的运行信息。

### 守护进程

在RPC版本发布前，仍为守护线程，上文谈到了 Daemon 的两种线程分类，此外还一种守护进程，位于 RPC 版本。

在 RPC 版本中，上文所说的两种 Daemon 主线程会在运行期间周期地及手动触发地发送自身信息给 Daemon 进程，当 Daemon 在预计的延时内未接受到 Daemon 主线程的信息，会认为该线程异常中断，便远程通信使其自动从快照恢复。

守护进程 Daemon 还管理作业执行等线程，Dlink 的 FlinkSQL 作业提交看似简单，但其后台进行了复杂的多步处理如：准备执行环境、解析增强语法、组装语句集、解析翻译优化得到 JobGraph、获取 yarnClient、提交JobGraph、等待响应。提交线程将其进度以及需要持久化到数据库的信息发送给 Daemon，Daemon 负责管理以及委托持久化。当然也可以通过 Daemon 来中断提交线程。

此外 Daemon 也负责 dlink-client 、dlink-server 与 dlink-admin三个进程的实例管理，配合 dubbo 来治理服务及扩展新服务。 

### 库表数据同步

Dlink 将提供基于 Flink 引擎的可视化构建库表数据同步任务的功能。

离线方面，Dlink 通过界面配置库表同步的作业配置，作业启动后，Dlink 从配置中获取数据源信息及库表选择信息等其他配置项，自动构建 Flink 批作业并交由 Daemon 依赖调度托管大量任务的有序稳定执行。

实时方面，Dlink 则根据配置信息自动构建 FlinkCDC 无锁作业，并交由 Daemon 实时任务守护进行流任务托管。

批流一体方面，Dlink 则将由上述两个 Daemon 协作完成，后者启动流任务后，前者通过批任务完成历史数据合并，或直接使用 FlinkCDC自带的批流一体读取来实现同步，具体按需求选择。

以上数据同步任务的定义将提供 SQL 语句 create datasync 来实现一句 SQL 定义任务的效果。

### 企业级功能

Dlink 将提供轻量的企业管理能力，如多租户、项目、角色、权限、审计。

此外 Dlink 将重新设计后台架构，使其更加解耦且插件化，基于服务的治理来满足大型场景的建设需求。

### 多版本 Flink-Client Server

在单机版本中，dlink-client 的执行环境所需要的依赖均从项目的 lib 和 plugins 目录下加载，一个 Dlink 实例只能部署一个版本的 Flink 环境。

在 RPC 版本中，将通过服务治理来同时支持不同版本的 dlink-client 任务提交。dlink-admin 管理 Flink-Client Server，通知 dlink-server 来启动 dlink-client，dlink-client 可以根据指定的依赖启动对应的 Flink Client环境并久驻，也可以根据环境变量来作为插件部署到 Flink 集群直接启动对应的 Flink Client环境并久驻。

Dlink 的任务在提交时，会根据指定集群实例或集群配置来获取对应版本号或者指定的 Flink-Client Server 来选择对应的 Flink-Client Server 进行任务的提交等其他操作。

### Flink StreamGraph 和 JobGraph 的可视化修改

Dlink 将提供 StreamGraph 和 JobGraph 两种状态下的任务计划可视化修改功能，如修改 StreamGraph 的算子并行度、自动追加 Sink 等。还支持将 Jar 提交任务在 dlink-client 转换成 StreamGraph 和 JobGraph ，然后进行分析、修改及统一提交，这样 Jar 任务也将可以得到血缘分析，进而可以被合并到数据链路图，被依赖调度一起托管。

### Flink 自动化动态扩缩容

Flink 流任务的动态扩缩容是个降本增效的好措施，Dlink 将提供自动化的自动动态扩缩容来应对 Reactive Mode 和非 Reactive Mode 两种场景。

首先 Dlink 会通过运行监控接口获取流作业的时序资源占用数据，以天级别或周级别甚至月级别来计算和评估资源的占用模型。

对于 Reactive Mode ，即 Flink 1.13 之后的 Standalone Application Mode 模式下，可通过 Kubernetes Horizontal Pod Autoscaler 进行自动扩缩容。

而对于非 Reactive Mode ，Dlink 将通过 Daemon 依据资源预测模型进行周期性的作业调整并行度等其他优化配置和重启作业来完成较高成本的自动化动态扩缩容。

### FlinkSQL OLAP & BI

Dlink 将投入更多精力来优化基于 FlinkSQL 来进行 OLAP 查询和查询结果BI化，使其可以通过柱状图、折线图、饼图等直观地展现出数据特征。

在 FlinkSQL OLAP 方面，一是，Dlink 将优化 Session 模式的作业提交效率与作业配置，逐步减少整个查询请求的响应时间；二是，Dlink 将自动装载指定数据源的元数据到对应会话中，使其 SQL 开发只需要关注 select 的口径，无需再次编写 set 和 create。

在 BI 方面，Dlink 将 FlinkSQL 及其他查询引擎如 jdbc 的查询结果进行自动化的转换，将表格数据转换为柱状图、折线图、饼图等其他图形所需要的数据格式，并进行渲染，便于数据科学家更值观地分析数据。

### FlinkSQL 翻译及生成

Dlink 将提供 FlinkSQL 翻译功能，该功能可以将传统 SQL 如 Mysql、Oracle 等 DDL 、DQL 语句翻译为 FlinkSQL 语句，便于作业迁移和降低门槛。通过SPI来扩展其他 Dialect 的转换。

Dlink也将提供 FlinkSQL 生成功能，通过元数据来生成 DDL，自动对齐 insert into select 等，使 FlinkSQL 开发更加便捷。

### Dlink-Jdbc

Dlink 将提供自身 jdbc 组件来便捷基于 Dlink 引擎的 FlinkSQL 任务提交。第三方系统（业务系统、数据库工具、调度平台、BI平台等等使用 jdbc 的系统）通过引入 dlink-jdbc.jar，如同开发 Mysql 的 jdbc 应用操作来执行 FlinkSQL，与 dlink-server 进行通信，dlink-server 根据 url 参数配置在对应版本的 dlink-client 上执行其 FlinkSQL。

### FlinkSQL Studio 交互优化

Dlink 目前提供了简陋的 Studio ，虽然可以满足基本的开发需求，但 Studio 其他功能同样对开发调试具有重大影响，如项目导入导出、文件导入导出、开发Demo、配置模板、执行日志、SQL 对比等功能。

Dlink 除了将逐步完成以上功能外，还要进行交互上的优化，使其更加接近专业的 IDE，如风格切换、面板调整、定时保存、History对比和恢复等。

### 实践分享

Dlink 将投入更多精力围绕业界主流的存储架构、平台等进行应用实践分享。

Dlink 通过用户在生产上对接各种生态的实践进行总结和整理，最终在公众号、官网中分享各实践主题下的用户经验与操作说明，如 FlinkCDC、Hive、ClickHouse、Doris、Hudi、Iceberg 等基于 Dlink 快速落地的经验。

Dlink 也将积极对接其他开源平台如 Linkis、AirFlow、DolphinScheduler、DataSphere Studio 等，使其可以为各平台在 Flink 支持上提供更多一种的选择，也将实现对应的批量作业导入功能，使其可以低成本地迁移作业。
